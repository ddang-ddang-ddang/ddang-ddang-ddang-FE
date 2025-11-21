import type { ApiResponse } from "@/types/common/api";

// 2차 재판 진행 중인 사건 응답 DTO (CaseOnResponseDto)
export type CaseOnResponseDto = {
  caseId: number;
  title: string;
  status: "PENDING" | "FIRST" | "SECOND" | "THIRD" | "DONE";
  mainArguments: string[]; // [argumentA, argumentB]
};

// 판결 응답 DTO (JudgmentResponseDto)
export type JudgmentResponseDto = {
  caseId: number;
  title?: string;
  verdict?: string;
  conclusion?: string;
  ratioA?: number;
  ratioB?: number;
  finalVerdict?: string;
  judgeIllustrationUrl?: string;
  createdAt?: string;
  completedAt?: string;
};

// 진행중인 재판 목록 응답 (2차 재판 진행 중인 사건 목록)
export type OngoingCasesResponse = ApiResponse<CaseOnResponseDto[]>;

// 최종 판결 히스토리 응답 (아카이브)
export type JudgmentHistoryResponse = ApiResponse<JudgmentResponseDto[]>;
