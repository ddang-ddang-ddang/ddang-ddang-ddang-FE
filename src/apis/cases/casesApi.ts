import instance from "@/apis/instance";
import type {
  OngoingCasesResponse,
  JudgmentHistoryResponse,
} from "@/types/apis/cases";

const BASE = "/api/v1/cases";

// 진행중인 재판 목록 조회 (2차 재판 진행 중인 사건)
const getOngoingCases = async (): Promise<OngoingCasesResponse> => {
  const { data } = await instance.get<OngoingCasesResponse>(
    `${BASE}/second`
  );
  return data;
};

// 최종 판결 히스토리 조회 (아카이브)
// 특정 케이스의 판결 히스토리를 조회
const getFinalJudgmentHistory = async (caseId: number): Promise<JudgmentHistoryResponse> => {
  const { data } = await instance.get<JudgmentHistoryResponse>(
    `/api/final/judge/${caseId}/history`
  );
  return data;
};

// 전체 아카이브 조회 (모든 완료된 케이스)
// TODO: 백엔드에서 전체 완료된 케이스 목록 API가 필요할 수 있음
const getAllArchivedCases = async (): Promise<JudgmentHistoryResponse> => {
  // 임시로 전체 히스토리를 조회하는 엔드포인트 (실제 API 스펙에 맞게 수정 필요)
  const { data } = await instance.get<JudgmentHistoryResponse>(
    `/api/final/judge/history`
  );
  return data;
};

export const casesApi = {
  getOngoingCases,
  getFinalJudgmentHistory,
  getAllArchivedCases,
} as const;

export type CasesApi = typeof casesApi;
