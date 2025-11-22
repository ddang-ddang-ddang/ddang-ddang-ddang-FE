import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import Button from "@/components/common/Button";
import ArgumentCheck from "@/components/third-trial/ArgumentCheck";
import { useThirdTrialStore } from "@/stores/thirdTrialStore";
import { useBestAdoptItemsQuery } from "@/hooks/thirdTrial/useThirdTrial";
import type { AdoptableItemDto } from "@/types/apis/adopt";
import type { ArgumentData } from "@/components/common/ArgumentCard";
import {
  THIRD_TRIAL_STEP_META,
  THIRD_TRIAL_STEPS,
} from "@/constants/thirdTrialStepMeta";

const MAX_SELECTION_PER_STEP = 3;

export default function Adopt() {
  const setStep = useThirdTrialStore((state) => state.setStep);
  const caseId = useThirdTrialStore((state) => state.caseId);
  const selectedArguments = useThirdTrialStore(
    (state) => state.selectedArguments
  );
  const updateSelectedArguments = useThirdTrialStore(
    (state) => state.updateSelectedArguments
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // 좋아요 많은 순으로 채택 가능한 항목 조회
  const { data: bestItemsRes, isLoading } = useBestAdoptItemsQuery(caseId ?? undefined);
  const bestItems = bestItemsRes?.result?.items ?? [];

  // API 데이터를 ArgumentData 형태로 변환하는 헬퍼 함수
  const mapToArgumentData = (item: AdoptableItemDto): ArgumentData => ({
    id: item.itemType === "DEFENSE" ? item.defenseId : item.id,
    userNickname: `유저 ${item.userId}`, // 실제 닉네임은 별도 API 필요하면 추가
    userDgree: "변호사", // 등급 정보가 없어 기본값 사용
    content: item.content,
    likes: item.likeCount,
    isBest: false,
    isReplyable: false,
  });

  // 데이터를 debateSide별로 그룹화 (A = first, B = second)
  const argumentsByDebateSide = useMemo(() => {
    const grouped: Record<"first" | "second", ArgumentData[]> = {
      first: [],
      second: [],
    };

    bestItems.forEach((item) => {
      if (item.debateSide === "A") {
        grouped.first.push(mapToArgumentData(item));
      } else if (item.debateSide === "B") {
        grouped.second.push(mapToArgumentData(item));
      }
    });

    return grouped;
  }, [bestItems]);

  const currentStepKey =
    THIRD_TRIAL_STEPS[Math.min(currentStepIndex, THIRD_TRIAL_STEPS.length - 1)];
  const meta = THIRD_TRIAL_STEP_META[currentStepKey];

  const argumentsForStep = argumentsByDebateSide[currentStepKey];
  const selectedForStep = selectedArguments[currentStepKey];

  const isMaxReached = useMemo(
    () => selectedForStep.length >= MAX_SELECTION_PER_STEP,
    [selectedForStep]
  );

  const handleToggle = useCallback(
    (argumentId: number, nextChecked: boolean) => {
      if (
        nextChecked &&
        !selectedForStep.includes(argumentId) &&
        isMaxReached
      ) {
        return;
      }

      const nextForSide = nextChecked
        ? Array.from(new Set([...selectedForStep, argumentId]))
        : selectedForStep.filter((id) => id !== argumentId);

      updateSelectedArguments(currentStepKey, nextForSide);
    },
    [currentStepKey, isMaxReached, selectedForStep, updateSelectedArguments]
  );

  const handleNext = () => {
    const isLastStep = currentStepIndex >= THIRD_TRIAL_STEPS.length - 1;
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
      return;
    }
    setStep("review");
  };

  const selectedCountText = `선택된 변론 ${selectedForStep.length}개 / ${MAX_SELECTION_PER_STEP}개`;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-main font-bold">채택 가능한 변론을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 px-6 py-10 text-main">
      <header className="flex w-full max-w-6xl flex-col items-center gap-6">
        <h1 className="text-center text-4xl font-bold md:text-4xl">
          최종심 변론 채택
        </h1>
        <div
          className={clsx(
            "flex w-full items-center justify-center rounded-[30px] py-10",
            meta.bgClass
          )}
        >
          <span
            className={clsx("text-[24px] font-bold", meta.headerTextClass)}
          >
            {meta.label}
          </span>
        </div>
        <p className="text-center text-base md:text-lg">
          현재 {meta.label}을 검토 중입니다. 각 단계에서 최대{" "}
          {MAX_SELECTION_PER_STEP}개까지 채택할 수 있어요.
        </p>
      </header>

      <div className="flex w-full max-w-6xl justify-end">
        <Button
          className={clsx("rounded-[15px] px-12 py-7 text-lg font-bold", meta.bgClass)}
          disabled={selectedForStep.length === 0}
          onClick={handleNext}
        >
          {meta.label} 채택 완료
        </Button>
      </div>

      <div
        className={clsx(
          "w-full max-w-6xl rounded-[20px] px-6 py-4 text-base border",
          meta.summaryBgClass,
          meta.summaryBorderClass
        )}
      >
        <span className="font-semibold">{selectedCountText}</span>
        {isMaxReached && (
          <span
            className={clsx("mt-1 block text-sm", meta.summaryAccentClass)}
          >
            최대 {MAX_SELECTION_PER_STEP}개까지 선택할 수 있습니다.
          </span>
        )}
      </div>

      <div
        className={clsx(
          "flex w-full max-w-6xl flex-col items-center border-t",
          meta.dividerBorderClass
        )}
      >
        {argumentsForStep.map((argument) => {
          const isSelected = selectedForStep.includes(argument.id);
          const disabled = !isSelected && isMaxReached;
          return (
            <ArgumentCheck
              key={argument.id}
              argument={argument}
              checked={isSelected}
              disabled={disabled}
              onToggle={handleToggle}
              checkClassName={meta.checkHighlightClass}
            />
          );
        })}
      </div>
    </section>
  );
}
