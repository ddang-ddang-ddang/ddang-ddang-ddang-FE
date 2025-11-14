import React, { useState, useCallback, useMemo } from "react";
import Button from "@/components/common/Button";
import HotDebateCard from "@/components/common/DebateCard";
import Hammer from "@/assets/svgs/hammer.svg?react";
import Left from "@/assets/svgs/Left.svg?react";
import Right from "@/assets/svgs/Right.svg?react";
import firstJudgeIllustrationUrl from "@/assets/svgs/FirstJudge.svg?url";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/constants";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  useHotCasesQuery,
  useMyOngoingCasesQuery,
  useMyDefensesQuery,
} from "@/hooks/home/useHome";

// HOT 재판 더미 데이터 (API 실패 시 사용)
const hotDebatesFallback = [
  { id: 1, title: "짜장면 VS 짬뽕", participants: 120 },
  { id: 2, title: "민트초코 VS 반민트초코", participants: 85 },
  { id: 3, title: "부먹 VS 찍먹", participants: 95 },
  { id: 4, title: "바다 VS 산", participants: 110 },
  { id: 5, title: "수도권 VS 지방 이사 논쟁", participants: 77 },
  { id: 6, title: "커피 VS 탄산음료", participants: 99 },
  { id: 7, title: "라면 VS 떡볶이", participants: 54 },
];

// 캐러셀 배치용 상수
const CARD_WIDTH = 340;
const CARD_GAP = 16;
const VISIBLE_COUNT = 4;

const MainPage = () => {
  // 캐러셀 시작 인덱스
  const [startIndex, setStartIndex] = useState(0);
  // 로그인 모달
  const [showLoginModal, setShowLoginModal] = useState(false);

  // 이전 화살표
  const handlePrevSingle = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    console.log("이전 슬라이드 클릭");
  }, []);

  // 캐러셀 이동 값
  const translateSingleValue = -(startIndex * (CARD_WIDTH + CARD_GAP));

  const navigate = useNavigate();
  const accessToken = useAuthStore((s) => s.accessToken);

  // 메인 페이지 API
  const hotQ = useHotCasesQuery();
  useMyOngoingCasesQuery();
  useMyDefensesQuery();

  // HOT 재판 리스트 (API → 카드용 데이터)
  const hotList =
    hotQ.data?.result?.map((c, idx) => ({
      id: c.caseId,
      title:
        c.mainArguments && c.mainArguments.length >= 2
          ? `${c.mainArguments[0]} VS ${c.mainArguments[1]}`
          : c.title,
      participants:
        hotDebatesFallback[idx % hotDebatesFallback.length].participants,
    })) ?? hotDebatesFallback;

  // 캐러셀 최대 인덱스
  const maxIndex = useMemo(
    () => Math.max(hotList.length - VISIBLE_COUNT, 0),
    [hotList.length]
  );

  // 다음 화살표
  const handleNextSingle = useCallback(() => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    console.log("다음 슬라이드 클릭");
  }, [maxIndex]);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero 영역 */}
      <section className="flex items-start pl-[120px] pr-[120px] pt-24 gap-[30px]">
        {/* 왼쪽: 슬로건 + 로그인 박스 (UI 데코) */}
        <div className="flex flex-col gap-[32px]">
          <h1 className="text-main font-bold text-[36px] leading-[150%]">
            일상의 고민, <br />
            AI와 함께 재판해보세요
          </h1>

          <div className="w-full">
            <div className="bg-main px-[35px] py-[44px] rounded-2xl w-[380px] h-[369px]">
              <div className="flex flex-col gap-6">
                <div className="flex gap-2 items-center mb-2">
                  <label className="text-[20px] text-white">로그인</label>
                  <Hammer />
                </div>

                <div className="w-full text-left">
                  <input
                    type="text"
                    id="id"
                    placeholder="ID"
                    className="bg-main-bright text-main font-bold h-15 w-full px-3 py-2 mt-1 rounded-md focus:outline-none disabled:bg-gray-100"
                  />
                </div>

                <div className="w-full mt-0 text-left">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="bg-main-bright text-main font-bold h-15 w-full px-3 py-2 mt-1 rounded-md focus:outline-none disabled:bg-gray-100"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="text-white hover:underline"
                  >
                    회원가입
                  </Button>
                  <Button
                    variant="primary"
                    className="px-10 py-2 rounded-md"
                    onClick={() => {
                      console.log("로그인 버튼 클릭");
                      // 추후: navigate(PATHS.LOGIN);
                    }}
                  >
                    로그인
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 첫 재판 시작 패널 */}
        <div className="flex-1 bg-[#6596DA] rounded-2xl p-[64px] w-[790px] h-[509px] relative transition">
          <h2 className="text-3xl font-bold text-white">
            AI판사와 밸런스 재판
          </h2>
          <p className="mt-4 text-sm text-white">
            일상 속 사소한 논쟁이 가장 치열한 토론 배틀이 됩니다.
          </p>
          <p className="text-sm text-white">
            AI판사와 배심원들 앞에서 논리를 증명하고 승리하세요.
          </p>

          <Button
            variant="white"
            size="lg"
            className="mt-55 px-[109px] py-[24px] rounded-3xl cursor-pointer hover:opacity-90"
            onClick={() => {
              if (accessToken) {
                navigate(PATHS.FIRST_TRIAL);
              } else {
                setShowLoginModal(true);
              }
            }}
          >
            재판 시작하기
          </Button>

          <img
            src={firstJudgeIllustrationUrl}
            alt="판사 아이콘"
            className="absolute bottom-0 right-10 w-[55%] max-w-md h-auto"
          />
        </div>
      </section>

      {/* HOT 재판 캐러셀 */}
      <section className="bg-main-bright pt-8 pb-20 mt-16 mb-20">
        {/* 제목 + 전체 재판 보기 버튼 */}
        <div className="flex pl-[120px] pr-[120px] justify-between items-center pt-10">
          <h2 className="text-2xl font-bold text-main">
            현재 진행중인 가장 핫한 재판에 참여해보세요
          </h2>
          <Button
            variant="bright_main"
            className="
              cursor-pointer px-[60px] py-[19px] rounded-[999px]
              shadow-[0_6px_0_0_rgba(62,116,214,0.7)]
              hover:shadow-[0_8px_0_0_rgba(62,116,214,0.8)]
              active:translate-y-[2px]
              active:shadow-[0_4px_0_0_rgba(62,116,214,0.8)]
              transition-all
            "
          >
            전체 재판 보기
          </Button>
        </div>

        <p className="pl-[120px] pr-[120px] text-main-medium mb-10">
          재판에 참여해서 변론을 작성하고, 당신의 논리를 펼쳐보세요!
        </p>

        {/* 카드 4장 보이고, 5번째부터 오른쪽에서 잘리는 캐러셀 */}
        <div className="relative mt-10">
          {/* 카드 뷰포트: 제목/버튼과 같은 content 폭 */}
          <div className="pl-[120px] pr-[120px]">
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(${translateSingleValue}px)`,
                  gap: `${CARD_GAP}px`,
                }}
              >
                {hotList.map((debate) => (
                  <HotDebateCard key={debate.id} debate={debate} />
                ))}
              </div>
            </div>
          </div>

          {/* 왼쪽 화살표 (첫 카드 왼쪽 + 22px 정도 간격) */}
          <Button
            onClick={handlePrevSingle}
            variant="white"
            disabled={startIndex === 0}
            className="absolute left-[46px] top-1/2 -translate-y-1/2 rounded-full w-13 h-13"
          >
            <Left className="w-6 h-6" title="이전 논쟁" />
          </Button>

          {/* 오른쪽 화살표 (5번째 카드 잘리는 위치) */}
          <Button
            onClick={handleNextSingle}
            variant="white"
            className="absolute right-[46px] top-1/2 -translate-y-1/2 rounded-full w-13 h-13 cursor-pointer"
          >
            <Right className="w-6 h-6" title="다음 논쟁" />
          </Button>
        </div>
      </section>

      {/* 로그인 필요 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowLoginModal(false)}
          />
          <div className="relative z-10 w-[420px] max-w-[90vw] rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-[20px] font-bold text-main mb-2">
              로그인이 필요합니다
            </h3>
            <p className="text-[16px] text-greyColor-grey700 mb-6">
              밸런스 재판을 시작하려면 먼저 로그인해주세요.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="bright_main"
                className="px-6"
                onClick={() => setShowLoginModal(false)}
              >
                닫기
              </Button>
              <Button
                variant="primary"
                className="px-6"
                onClick={() => {
                  setShowLoginModal(false);
                  navigate(PATHS.LOGIN);
                }}
              >
                로그인하러 가기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
