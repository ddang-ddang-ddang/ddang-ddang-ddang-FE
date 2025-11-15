import React, { useMemo, useRef, useState } from "react";
import {
  useRebuttalsQuery,
  usePostRebuttalMutation,
  usePostRebuttalLikeMutation,
} from "@/hooks/secondTrial/useSecondTrial";
import type {
  RebuttalItem,
  RebuttalRequest,
  LikeRequest,
} from "@/types/apis/secondTrial";
import ThumbUpIcon from "@/assets/svgs/thumbs-up.svg";

export interface ArgumentCardProps {
  defenseId: number;
  authorNickname?: string;
  side?: string; // "A" | "B"
  content?: string;
  likesCount?: number;
  isLikedByMe?: boolean;
  badgeLabel?: string; // 상단 왼쪽 칭호/뱃지 텍스트
}

const ArgumentCard: React.FC<ArgumentCardProps> = ({
  defenseId,
  authorNickname = "닉네임",
  side,
  content,
  likesCount = 0,
  isLikedByMe,
  badgeLabel = "칭호",
}) => {
  // 의견(반론) 조회
  const { data: rebuttalsRes, isLoading: isRebuttalsLoading } =
    useRebuttalsQuery(defenseId);
  const rebuttals: RebuttalItem[] = (rebuttalsRes?.result as RebuttalItem[]) ?? [];

  // 의견(반론) 등록/좋아요
  const postRebuttalMutation = usePostRebuttalMutation();
  const postRebuttalLikeMutation = usePostRebuttalLikeMutation();

  // UI 상태
  const [expanded, setExpanded] = useState(false);
  const [rebuttalContent, setRebuttalContent] = useState("");
  const [rebuttalType, setRebuttalType] = useState<"A" | "B">(
    (side as "A" | "B") || "A"
  );
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const repliesCount = useMemo(() => rebuttals.length ?? 0, [rebuttals]);

  const handleToggleExpanded = () => setExpanded((v) => !v);

  const handleFocusWrite = () => {
    if (!expanded) setExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const handleSubmitRebuttal = async () => {
    const trimmed = rebuttalContent.trim();
    if (!trimmed) return;
    const body: RebuttalRequest = {
      defenseId,
      parentId: null,
      type: rebuttalType,
      content: trimmed,
    };
    try {
      await postRebuttalMutation.mutateAsync({ defenseId, body });
      setRebuttalContent("");
      if (!expanded) setExpanded(true);
    } catch (err) {
      console.error("반론 등록 실패:", err);
      alert("의견 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleLikeRebuttal = async (rebuttalId: number) => {
    const body: LikeRequest = { contentId: rebuttalId, contentType: "REBUTTAL" };
    try {
      await postRebuttalLikeMutation.mutateAsync({ rebuttalId, body });
    } catch (err) {
      console.error("반론 좋아요 실패:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      {/* 상단 헤더 */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-block px-3 py-1 rounded-full border border-main text-main text-xs font-semibold">
            {badgeLabel}
          </span>
          <span className="text-main font-bold">{authorNickname}</span>
        </div>

        <div className="flex items-center gap-2 text-main">
          <ThumbUpIcon/>
          <span className="text-md">
            {likesCount}명이 이 의견에 찬성합니다
          </span>
        </div>
      </div>

      {/* 본문 */}
      {side && (
        <div className="text-sm text-main font-semibold mt-3">{side} 의견</div>
      )}
      <p className="mt-2 leading-7 text-main">
        {content}
      </p>

      {/* 토글/의견달기 링크 */}
      <div className="mt-4 flex flex-col gap-3">
        <button
          className="flex items-center gap-2 text-main font-semibold"
          onClick={handleToggleExpanded}
        >
          <span className="text-lg">{expanded ? "▲" : "▶"}</span>
          <span>
            {expanded ? "의견 접기" : `의견 ${repliesCount}개 펼쳐보기`}
          </span>
        </button>

        <button
          className="flex items-center gap-2 text-main"
          onClick={handleFocusWrite}
        >
          <span className="text-lg">↳</span>
          <span className="font-semibold">의견달기</span>
        </button>
      </div>

      {/* 펼친 영역: 의견 리스트 + 입력 */}
      {expanded && (
        <div className="mt-4 space-y-3">
          {isRebuttalsLoading ? (
            <div className="text-sm text-gray-500">의견을 불러오는 중...</div>
          ) : rebuttals.length === 0 ? (
            <div className="text-sm text-gray-500">등록된 의견이 없습니다.</div>
          ) : (
            rebuttals.map((r) => (
              <div key={r.rebuttalId} className="p-3 rounded-md border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-main font-semibold">
                      {r.authorNickname} · {r.type}
                    </div>
                    <div className="mt-1 text-main">{r.content}</div>
                  </div>

                  <button
                    onClick={() => handleLikeRebuttal(r.rebuttalId)}
                    disabled={postRebuttalLikeMutation.isPending}
                    className="text-xs px-2 py-1 rounded bg-main-bright text-main"
                  >
                    좋아요 {r.likesCount}
                  </button>
                </div>

                {r.children?.length ? (
                  <div className="mt-2 pl-4 space-y-2">
                    {r.children.map((child) => (
                      <div
                        key={child.rebuttalId}
                        className="p-2 rounded-md border border-gray-200 bg-white"
                      >
                        <div className="text-main text-xs font-semibold">
                          {child.authorNickname} · {child.type}
                        </div>
                        <div className="text-main text-sm">{child.content}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))
          )}

          {/* 의견 입력 */}
          <div className="mt-2 p-3 rounded-md border border-gray-200 bg-main-bright">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm text-main">타입</label>
              <select
                value={rebuttalType}
                onChange={(e) => setRebuttalType(e.target.value as "A" | "B")}
                className="p-1 rounded-md"
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>

            <textarea
              ref={inputRef}
              rows={3}
              value={rebuttalContent}
              onChange={(e) => setRebuttalContent(e.target.value)}
              className="w-full p-2 rounded-md bg-white border"
              placeholder="의견 내용을 입력하세요."
            />

            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmitRebuttal}
                disabled={postRebuttalMutation.isPending}
                className="px-4 py-2 bg-main text-white rounded-md"
              >
                {postRebuttalMutation.isPending ? "등록중..." : "의견 등록"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArgumentCard;