import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  useRebuttalsQuery,
  usePostRebuttalMutation,
} from "@/hooks/secondTrial/useSecondTrial";
import {
  useToggleRebuttalLikeMutation,
  useToggleDefenseLikeMutation,
} from "@/hooks/like/useLike";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useSearchParams } from "react-router-dom";
import type {
  RebuttalItem,
  RebuttalRequest,
  LikeRequest,
} from "@/types/apis/secondTrial";
import ThumbUpIcon from "@/assets/svgs/thumbs-up.svg?react";

export interface ArgumentCardProps {
  defenseId: number;
  caseId: number;
  authorNickname?: string;
  side?: string;
  content?: string;
  likesCount?: number;
  isLikedByMe?: boolean;
  badgeLabel?: string;
}

// 개별 댓글 컴포넌트 (하이라이트 효과 포함)
const RebuttalCard: React.FC<{
  rebuttal: RebuttalItem;
  onLike: (id: number) => void;
  isPending: boolean;
  highlightId: number | null;
}> = ({ rebuttal, onLike, isPending, highlightId }) => {
  const rebuttalRef = useRef<HTMLDivElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (highlightId === rebuttal.rebuttalId && rebuttalRef.current) {
      // 스크롤 이동
      rebuttalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // 깜빡임 효과
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 2000);

      return () => clearTimeout(timer);
    }
  }, [highlightId, rebuttal.rebuttalId]);

  return (
    <div
      ref={rebuttalRef}
      className={`p-3 rounded-md border transition-all duration-300 ${
        isHighlighted
          ? "border-yellow-400 bg-yellow-50 animate-pulse"
          : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="text-main font-semibold">
            {rebuttal.authorNickname} · {rebuttal.type}
          </div>
          <div className="mt-1 text-main">{rebuttal.content}</div>
        </div>

        <button
          onClick={() => onLike(rebuttal.rebuttalId)}
          disabled={isPending}
          className="text-xs px-2 py-1 rounded bg-main-bright text-main disabled:opacity-50"
        >
          좋아요 {rebuttal.likesCount}
        </button>
      </div>

      {rebuttal.children?.length ? (
        <div className="mt-2 pl-4 space-y-2">
          {rebuttal.children.map((child) => (
            <RebuttalCard
              key={child.rebuttalId}
              rebuttal={child}
              onLike={onLike}
              isPending={isPending}
              highlightId={highlightId}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const ArgumentCard: React.FC<ArgumentCardProps> = ({
  defenseId,
  caseId,
  authorNickname = "닉네임",
  side,
  content,
  likesCount = 0,
  isLikedByMe,
  badgeLabel = "칭호",
}) => {
  const [searchParams] = useSearchParams();
  const { data: rebuttalsRes, isLoading: isRebuttalsLoading } = useRebuttalsQuery(defenseId);
  const postRebuttalMutation = usePostRebuttalMutation();
  const toggleRebuttalLikeMutation = useToggleRebuttalLikeMutation();
  const toggleDefenseLikeMutation = useToggleDefenseLikeMutation();
  
  const { highlightRebuttalId, setHighlightRebuttal } = useNotificationStore();

  const [likedDefense, setLikedDefense] = useState(!!isLikedByMe);
  const [defenseLikes, setDefenseLikes] = useState(likesCount);
  const [expanded, setExpanded] = useState(false);
  const [rebuttalContent, setRebuttalContent] = useState("");
  const [rebuttalType, setRebuttalType] = useState<"A" | "B">((side as "A" | "B") || "A");
  
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const rebuttals: RebuttalItem[] = (rebuttalsRes?.result as RebuttalItem[]) ?? [];
  const repliesCount = useMemo(() => rebuttals.length ?? 0, [rebuttals]);

  // URL에서 rebuttalId가 있으면 자동으로 펼치기
  useEffect(() => {
    const rebuttalId = searchParams.get("rebuttalId");
    if (rebuttalId) {
      setExpanded(true);
      setHighlightRebuttal(Number(rebuttalId));
      
      // 3초 후 하이라이트 제거
      const timer = setTimeout(() => {
        setHighlightRebuttal(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams, setHighlightRebuttal]);

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
      await postRebuttalMutation.mutateAsync(body);
      setRebuttalContent("");
      if (!expanded) setExpanded(true);
    } catch (err) {
      console.error("반론 등록 실패:", err);
      alert("의견 등록에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handleToggleDefenseLike = () => {
    if (toggleDefenseLikeMutation.isPending) return;
    const body: LikeRequest = { contentId: defenseId, contentType: "DEFENSE" };
    const nextLiked = !likedDefense;
    setLikedDefense(nextLiked);
    setDefenseLikes((c) => Math.max(0, c + (nextLiked ? 1 : -1)));
    toggleDefenseLikeMutation.mutate(
      { caseId, body },
      {
        onSuccess: (res) => {
          if (res.result !== nextLiked) {
            setLikedDefense(res.result);
            setDefenseLikes((c) =>
              Math.max(0, c + (res.result ? 1 : -1) - (nextLiked ? 1 : -1))
            );
          }
        },
        onError: () => {
          setLikedDefense((prev) => !prev);
          setDefenseLikes((c) => Math.max(0, c + (nextLiked ? -1 : 1)));
          alert("방어변론 좋아요 처리 실패");
        },
      }
    );
  };

  const handleLikeRebuttal = async (rebuttalId: number) => {
    if (toggleRebuttalLikeMutation.isPending) return;
    const body: LikeRequest = { contentId: rebuttalId, contentType: "REBUTTAL" };
    toggleRebuttalLikeMutation.mutate(
      { defenseId, body },
      {
        onError: () => alert("반론 좋아요 처리 실패"),
      }
    );
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

        {/* 상단 좋아요 UI */}
        <button
          onClick={handleToggleDefenseLike}
          disabled={toggleDefenseLikeMutation.isPending}
          className="flex items-center gap-2 text-main disabled:opacity-50"
          aria-label="방어변론 좋아요"
        >
          <ThumbUpIcon className={likedDefense ? "opacity-60" : ""} />
          <span className="text-md">
            {defenseLikes}명이 이 의견에 찬성합니다
          </span>
        </button>
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
              <RebuttalCard
                key={r.rebuttalId}
                rebuttal={r}
                onLike={handleLikeRebuttal}
                isPending={toggleRebuttalLikeMutation.isPending}
                highlightId={highlightRebuttalId}
              />
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