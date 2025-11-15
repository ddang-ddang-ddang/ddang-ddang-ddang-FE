import { startSecondTrial, getSecondTrialDetails, getDefenses, postDefense, postLike, postVote, getVoteResult, postRebuttal, getRebuttals, postRebuttalLike, } from "@/apis/secondTrial/secondTrialApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/common/api";
import type { SecondTrialDetailsResponse, DefenseRequest, LikeRequest, VoteRequest, VoteResultResponse, RebuttalRequest, DefenseItem, RebuttalItem } from "@/types/apis/secondTrial";

// 2차 재판 시작 훅
export const useStartSecondTrialMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (caseId: number) => startSecondTrial(caseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secondTrialDetails'] });
    },
  });
};

// 2차 재판 상세 조회 훅 (object form)
export const useSecondTrialDetailsQuery = (caseId?: number) => {
  return useQuery<ApiResponse<SecondTrialDetailsResponse>, Error>({
    queryKey: ['secondTrialDetails', caseId ?? ''],
    queryFn: async () => {
      if (!caseId) throw new Error("caseId is required");
      return getSecondTrialDetails(caseId);
    },
    enabled: !!caseId,
  });
};

// 변론 제출 훅
export const usePostDefenseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // expects variables: { caseId: number, body: DefenseRequest }
    mutationFn: ({ caseId, body }: { caseId: number; body: DefenseRequest }) =>
      postDefense(caseId, body),
    onSuccess: () => {
      // 제출 성공 시 상세 조회 재요청
      queryClient.invalidateQueries({ queryKey: ['secondTrialDetails'] });
    },
  });
};

// 좋아요 제출 훅
export const usePostLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ defenseId, body }: { defenseId: number; body: LikeRequest }) =>
      postLike(defenseId, body),
    onSuccess: () => {
      // 좋아요 상태 변경 시 상세 재조회
      queryClient.invalidateQueries({ queryKey: ["secondTrialDetails"] });
    },
  });
};

// 투표 제출 훅
export const usePostVoteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ caseId, body }: { caseId: number; body: VoteRequest }) =>
      postVote(caseId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["secondTrialDetails"] });
    },
  });
};


// 투표 결과 조회 훅
export const useVoteResultQuery = (caseId?: number) => {
  return useQuery<ApiResponse<VoteResultResponse>, Error>({
    queryKey: ["voteResult", caseId ?? ""],
    queryFn: async () => {
      if (!caseId) throw new Error("caseId is required");
      return getVoteResult(caseId);
    },
    enabled: !!caseId,
  });
};

// 반론 등록 훅
export const usePostRebuttalMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // variables: { defenseId, body }
    mutationFn: ({ defenseId, body }: { defenseId: number; body: RebuttalRequest }) =>
      postRebuttal(defenseId, body),
    onSuccess: () => {
      // 반론 등록 후 관련 상세 재조회
      queryClient.invalidateQueries({ queryKey: ["secondTrialDetails"] });
    },
  });
};

// 반론 좋아요 훅
export const usePostRebuttalLikeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // variables: { rebuttalId: number, body: LikeRequest }
    mutationFn: ({ rebuttalId, body }: { rebuttalId: number; body: LikeRequest }) =>
      postRebuttalLike(rebuttalId, body),
    onSuccess: () => {
      // 좋아요 변경 시 상세 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ["secondTrialDetails"] });
    },
  });
};

/**
 * 변론 목록 조회 훅
 * 사용 예: const { data, isLoading } = useDefensesQuery(caseId);
 */
export const useDefensesQuery = (caseId?: number) => {
  return useQuery<ApiResponse<DefenseItem[]>, Error>({
    queryKey: ["defenses", caseId ?? ""],
    queryFn: async () => {
      if (!caseId) throw new Error("caseId is required");
      return getDefenses(caseId);
    },
    enabled: !!caseId,
  });
};

/**
 * 반론(대댓글) 목록 조회 훅
 * 사용: const { data, isLoading } = useRebuttalsQuery(defenseId);
 */
export const useRebuttalsQuery = (defenseId?: number) => {
  return useQuery<ApiResponse<RebuttalItem[]>, Error>({
    queryKey: ["rebuttals", defenseId ?? ""],
    queryFn: async () => {
      if (!defenseId) throw new Error("defenseId is required");
      return getRebuttals(defenseId);
    },
    enabled: !!defenseId,
  });
};