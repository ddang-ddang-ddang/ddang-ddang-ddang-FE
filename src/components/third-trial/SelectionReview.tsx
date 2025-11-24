import { useMemo, useState, useCallback, useEffect } from "react";
import Button from "@/components/common/Button";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";
import { useBestAdoptItemsQuery, useAdoptItemsMutation, useChangeToThirdTrialMutation, useCreateJudgmentMutation, useAdoptedItemsQuery } from "@/hooks/thirdTrial/useThirdTrial";
import { useSecondTrialDetailsQuery } from "@/hooks/secondTrial/useSecondTrial";
import { useAuthStore } from "@/stores/useAuthStore";
import type { AdoptableItemDto } from "@/types/apis/adopt";
import {
  THIRD_TRIAL_STEP_META,
  THIRD_TRIAL_STEPS,
} from "@/constants/thirdTrialStepMeta";
import ChevronUpIcon from "@/assets/icons/ChevronUpIcon";

export default function SelectionReview() {
  const selectedArguments = useThirdTrialStore(
    (state) => state.selectedArguments
  );
  const setStep = useThirdTrialStore((state) => state.setStep);
  const caseId = useThirdTrialStore((state) => state.caseId);

  // 채택 가능한 항목 조회
  const { data: bestItemsRes, isLoading: isLoadingItems } = useBestAdoptItemsQuery(caseId ?? undefined);
  const bestItems = bestItemsRes?.result?.items ?? [];

  // 2차 재판 세부 정보 조회 (작성자 확인용)
  const { data: detailsRes, isLoading: isDetailsLoading } = useSecondTrialDetailsQuery(caseId ?? undefined);
  const details = detailsRes?.result;

  // 유저 정보 가져오기
  const userId = useAuthStore((state) => state.userId);

  // 이미 채택된 항목 조회 (상대방 채택 확인용, 폴링)
  const { data: adoptedItemsRes, refetch: refetchAdoptedItems } = useAdoptedItemsQuery(caseId ?? undefined);
  const adoptedItems = adoptedItemsRes?.result?.items ?? [];

  // 수동 채택 mutation
  const adoptItemsMutation = useAdoptItemsMutation();

  // 3차 재판으로 상태 변경 mutation
  const changeToThirdTrialMutation = useChangeToThirdTrialMutation();

  // 최종 판결 생성 mutation
  const createJudgmentMutation = useCreateJudgmentMutation();

  const isPending = adoptItemsMutation.isPending || changeToThirdTrialMutation.isPending || createJudgmentMutation.isPending;

  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const [isPolling, setIsPolling] = useState(false);

  const toggleOpen = useCallback((id: number) => {
    setOpenMap((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  }, []);

  // 폴링: 상대방이 채택을 완료했는지 5초마다 확인
  useEffect(() => {
    if (!isPolling) return;

    const intervalId = setInterval(() => {
      refetchAdoptedItems();
    }, 5000); // 5초마다 폴링

    return () => clearInterval(intervalId);
  }, [isPolling, refetchAdoptedItems]);

  // A와 B 양쪽 모두 채택을 완료했는지 확인
  const isBothAdopted = useMemo(() => {
    if (!details || userId === null) return false;

    const isAuthorA = userId === details.argumentA.authorId;
    const isAuthorB = userId === details.argumentB.authorId;

    // 둘 다 작성자인 경우는 항상 true (혼자 채택)
    if (isAuthorA && isAuthorB) return true;

    // 채택된 항목에서 A측과 B측 항목이 모두 있는지 확인
    const hasASideItems = adoptedItems.some((item) => item.debateSide === "A");
    const hasBSideItems = adoptedItems.some((item) => item.debateSide === "B");

    return hasASideItems && hasBSideItems;
  }, [adoptedItems, details, userId]);

  // 선택된 ID에 해당하는 실제 아이템 찾기 (작성자에 따라 필터링)
  const sections = useMemo(
    () => {
      if (!details || userId === null) return [];

      const isAuthorA = userId === details.argumentA.authorId;
      const isAuthorB = userId === details.argumentB.authorId;

      return THIRD_TRIAL_STEPS
        .map((step) => {
          const ids = selectedArguments[step];
          const debateSide = step === "first" ? "A" : "B";

          // 작성자 필터링: A만 작성자면 first만, B만 작성자면 second만, 둘 다면 둘 다
          if (step === "first" && !isAuthorA) return null;
          if (step === "second" && !isAuthorB) return null;

          // 해당 debateSide의 아이템들 필터링
          const itemsForSide = bestItems.filter((item) => item.debateSide === debateSide);

          // 선택된 ID에 해당하는 아이템 찾기
          const items = ids
            .map((id) => itemsForSide.find((item) => item.id === id))
            .filter((item): item is AdoptableItemDto => Boolean(item));

          return {
            step,
            items,
          };
        })
        .filter((section): section is { step: "first" | "second"; items: AdoptableItemDto[] } =>
          section !== null
        );
    },
    [selectedArguments, bestItems, details, userId]
  );

  // 로딩 상태
  if (isLoadingItems || isDetailsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-main font-bold">선택한 변론을 불러오는 중...</p>
      </div>
    );
  }

  const handleRetry = () => {
    setIsPolling(false);
    setStep("adopt");
  };

  const handleProceed = async () => {
    if (!caseId || !details || userId === null) {
      alert("케이스 정보가 없습니다.");
      return;
    }

    const isAuthorA = userId === details.argumentA.authorId;
    const isAuthorB = userId === details.argumentB.authorId;

    // 선택된 ID를 defenseId와 rebuttalId로 분류
    const allSelectedIds = [...selectedArguments.first, ...selectedArguments.second];
    const selectedItems = bestItems.filter((item) => allSelectedIds.includes(item.id));

    const defenseIds = selectedItems
      .filter((item) => item.itemType === "DEFENSE")
      .map((item) => item.id);

    const rebuttalIds = selectedItems
      .filter((item) => item.itemType === "REBUTTAL")
      .map((item) => item.id);

    try {
      // 1. 수동 채택 API 호출
      await adoptItemsMutation.mutateAsync({
        caseId,
        body: {
          defenseId: defenseIds.length > 0 ? defenseIds : undefined,
          rebuttalId: rebuttalIds.length > 0 ? rebuttalIds : undefined,
        },
      });

      // 채택된 항목 새로고침
      await refetchAdoptedItems();

      // 2. 양쪽 모두 작성자인 경우: 바로 3차 재판 진행
      if (isAuthorA && isAuthorB) {
        await changeToThirdTrialMutation.mutateAsync(caseId);
        await createJudgmentMutation.mutateAsync(caseId);
        setStep("loading");
        return;
      }

      // 3. 한쪽만 작성자인 경우: 상대방도 채택했는지 확인
      const adoptedItemsAfter = (await refetchAdoptedItems()).data?.result?.items ?? [];
      const hasASideItems = adoptedItemsAfter.some((item) => item.debateSide === "A");
      const hasBSideItems = adoptedItemsAfter.some((item) => item.debateSide === "B");

      if (hasASideItems && hasBSideItems) {
        // 양쪽 모두 채택 완료: 3차 재판 진행
        await changeToThirdTrialMutation.mutateAsync(caseId);
        await createJudgmentMutation.mutateAsync(caseId);
        setStep("loading");
      } else {
        // 상대방이 아직 채택하지 않음: 폴링 시작
        setIsPolling(true);
      }
    } catch (error) {
      console.error("채택 또는 3차 재판 시작 실패:", error);
      alert("재판 진행에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 폴링 중에 양쪽 모두 채택이 완료되면 자동으로 다음 단계로
  useEffect(() => {
    if (isPolling && isBothAdopted && caseId) {
      (async () => {
        try {
          await changeToThirdTrialMutation.mutateAsync(caseId);
          await createJudgmentMutation.mutateAsync(caseId);
          setIsPolling(false);
          setStep("loading");
        } catch (error) {
          console.error("3차 재판 시작 실패:", error);
          alert("재판 진행에 실패했습니다. 다시 시도해주세요.");
          setIsPolling(false);
        }
      })();
    }
  }, [isPolling, isBothAdopted, caseId, changeToThirdTrialMutation, createJudgmentMutation, setStep]);

  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-[144px] px-6 py-12 text-main">
      <h1 className="text-center text-[38px] font-bold">최종심 변론 채택</h1>

      {sections.map(({ step, items }) => {
        const meta = THIRD_TRIAL_STEP_META[step];

        return (
          <div key={step} className="flex flex-col items-center gap-8">
            <div
              className={`flex h-[96px] w-full max-w-[995px] items-center justify-center rounded-[30px] ${meta.bgClass}`}
            >
              <span
                className={`text-[24px] font-bold ${meta.headerTextClass}`}
              >
                {meta.label}
              </span>
            </div>

            <div className="flex w-full max-w-[1129px] flex-col gap-4">
              {items.length === 0 ? (
                <div
                  className={`flex h-[146px] items-center justify-center rounded-[30px] bg-white text-lg text-main opacity-70`}
                >
                  선택된 변론이 없습니다.
                </div>
              ) : (
                items.map((item) => {
                  const isOpen = (openMap[item.id] ?? true);
                  return (
                  <article
                    key={item.id}
                    className={`relative flex w-full flex-col gap-6 rounded-[30px] px-8 py-8 md:px-12 ${meta.cardBgClass}`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleOpen(item.id)}
                      className="absolute right-6 top-3 md:right-12 p-1"
                    >
                      <ChevronUpIcon className={`h-[53px] w-[53px] text-main transition-transform duration-200 ${isOpen ? "rotate-0" : "rotate-180"}`} />
                    </button>

                    <div className="flex items-center gap-[25px]">
                      <span className="text-[16px] font-bold text-main">
                        유저 {item.userId}
                      </span>
                      <span
                        className={`rounded-full px-5 py-[5px] text-[14px] font-normal leading-[17px] text-white ${meta.badgeClass}`}
                      >
                        {item.itemType === "DEFENSE" ? "변론" : "반론"} | ♥ {item.likeCount}
                      </span>
                    </div>

                    {isOpen && (
                      <p className="text-[16px] font-normal leading-[24px] text-main">
                        {item.content}
                      </p>
                    )}
                  </article>
                )
                })
              )}
            </div>
          </div>
        );
      })}

      <div className="flex flex-col items-center gap-8">
        {isPolling ? (
          // 폴링 중 (상대방 대기 중)
          <>
            <div className="flex flex-col items-center gap-6">
              <div className="rounded-[30px] bg-[#FFF5E6] px-12 py-8 text-center">
                <p className="text-[24px] font-bold text-main">
                  상대방의 채택을 기다리는 중입니다...
                </p>
                <p className="mt-4 text-[18px] text-main opacity-70">
                  상대방이 채택을 완료하면 자동으로 최종 재판이 진행됩니다.
                </p>
              </div>
              {/* 로딩 애니메이션 */}
              <div className="flex gap-2">
                <div className="h-3 w-3 animate-bounce rounded-full bg-main [animation-delay:-0.3s]"></div>
                <div className="h-3 w-3 animate-bounce rounded-full bg-main [animation-delay:-0.15s]"></div>
                <div className="h-3 w-3 animate-bounce rounded-full bg-main"></div>
              </div>
            </div>
            <Button
              className="rounded-[15px] bg-[#CCCBCB] px-[50px] py-[30px] text-[24px] font-bold text-white hover:bg-[#BDBDBD]"
              onClick={handleRetry}
            >
              변론 다시 채택하기
            </Button>
          </>
        ) : (
          // 일반 상태
          <>
            <p className="text-center text-[20px] leading-[30px]">
              위의 변론을 채택하시겠습니까? 채택하면 변경이 불가능하며 바로
              최종재판이 진행됩니다
            </p>
            <div className="flex flex-wrap items-center justify-center gap-14">
              <Button
                className="rounded-[15px] bg-[#CCCBCB] px-[50px] py-[30px] text-[24px] font-bold text-white hover:bg-[#BDBDBD]"
                onClick={handleRetry}
              >
                변론 다시 채택하기
              </Button>
              <Button
                className="rounded-[15px] bg-main px-[50px] py-[30px] text-[24px] font-bold text-white hover:opacity-90"
                onClick={handleProceed}
                disabled={isPending}
              >
                {isPending ? "재판 시작 중..." : "최종 재판 진행하기"}
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
