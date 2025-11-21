import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { thirdTrialApi } from "@/apis/thirdTrial/thirdTrialApi";
import type { ThirdTrialStartRequest } from "@/types/apis/thirdTrial";

// 3차 재판 시작 훅
export const useStartThirdTrialMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ThirdTrialStartRequest) =>
      thirdTrialApi.postThirdTrialStart(body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["third-trial", "case", variables.caseId],
      });
    },
  });
};

// 3차 재판 상세 조회 훅
export const useThirdCaseDetailQuery = (caseId?: number) =>
  useQuery({
    queryKey: ["third-trial", "case", caseId],
    queryFn: () => thirdTrialApi.getThirdTrialDetail(caseId as number),
    enabled: !!caseId,
  });

// 3차 재판 판결 조회 훅
export const useThirdJudgmentQuery = (
  caseId?: number,
  refetchInterval?: number
) =>
  useQuery({
    queryKey: ["third-trial", "case", caseId, "judgment"],
    queryFn: () => thirdTrialApi.getThirdTrialJudgment(caseId as number),
    enabled: !!caseId,
    refetchInterval,
  });

// 3차 재판 상태 완료 처리 훅
export const usePatchThirdCaseDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ caseId }: { caseId: number }) =>
      thirdTrialApi.patchThirdTrialStatus(caseId, { status: "DONE" }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["third-trial", "case", variables.caseId],
      });
    },
  });
};
