import instance from "@/apis/instance";
import type { ApiResponse } from "@/types/common/api";
import type { SecondTrialDetailsResponse, DefenseRequest, DefenseResponse, DefenseItem, LikeRequest, VoteRequest, VoteResultResponse, RebuttalRequest, RebuttalResponse, RebuttalItem } from "@/types/apis/secondTrial";

const startSecondTrial = async (caseId: number): Promise<ApiResponse<null>> => {
  const { data } = await instance.patch<ApiResponse<null>>(
    `/api/v1/cases/${caseId}/appeal`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const getSecondTrialDetails = async (caseId: number): Promise<ApiResponse<SecondTrialDetailsResponse>> => {
  const { data } = await instance.get<ApiResponse<SecondTrialDetailsResponse>>(
    `/api/v1/cases/${caseId}/second`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const postDefense = async (caseId: number, body: DefenseRequest): Promise<ApiResponse<DefenseResponse>> => {
  const { data } = await instance.post<ApiResponse<DefenseResponse>>(
    `/api/v1/cases/${caseId}/defenses`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const postLike = async (defenseId: number, body: LikeRequest): Promise<ApiResponse<boolean>> => {
  const { data } = await instance.post<ApiResponse<boolean>>(
    `/api/likes/${defenseId}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const postVote = async (caseId: number, body: VoteRequest): Promise<ApiResponse<null>> => {
  const { data } = await instance.post<ApiResponse<null>>(
    `/api/v1/cases/${caseId}/vote`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

const getVoteResult = async (caseId: number): Promise<ApiResponse<VoteResultResponse>> => {
  const { data } = await instance.get<ApiResponse<VoteResultResponse>>(
    `/api/v1/cases/${caseId}/vote/result`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

/**
 * 반론 등록
 * POST /api/v1/rebuttals/{defenseId}
 * RequestHeader: Content-Type: application/json, Authorization: Bearer accessToken
 * RequestBody: { defenseId, parentId, type, content }
 * Response: ApiResponse<{ rebuttalId: number }>
 */
const postRebuttal = async (defenseId: number, body: RebuttalRequest): Promise<ApiResponse<RebuttalResponse>> => {
  const { data } = await instance.post<ApiResponse<RebuttalResponse>>(
    `/api/v1/rebuttals/${defenseId}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

/**
 * 반론(리버털) 좋아요 추가
 * POST /api/likes/{rebuttalId}
 * headers: Content-Type: application/json, Authorization: Bearer accessToken
 * body: { contentId: number, contentType: "REBUTTAL" }
 * response: ApiResponse<boolean>
 */
const postRebuttalLike = async (rebuttalId: number, body: LikeRequest): Promise<ApiResponse<boolean>> => {
  const { data } = await instance.post<ApiResponse<boolean>>(
    `/api/likes/${rebuttalId}`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

/**
 * 변론 목록 조회
 * GET /api/v1/cases/{caseId}/defenses
 * headers: Authorization: Bearer accessToken
 * response: ApiResponse<DefenseItem[]>
 */
const getDefenses = async (caseId: number): Promise<ApiResponse<DefenseItem[]>> => {
  const { data } = await instance.get<ApiResponse<DefenseItem[]>>(
    `/api/v1/cases/${caseId}/defenses`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

/**
 * 반론(대댓글) 목록 조회 (중첩)
 * GET /api/v1/defenses/{defenseId}/rebuttals
 */
const getRebuttals = async (defenseId: number): Promise<ApiResponse<RebuttalItem[]>> => {
  const { data } = await instance.get<ApiResponse<RebuttalItem[]>>(
    `/api/v1/defenses/${defenseId}/rebuttals`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

export { startSecondTrial, getSecondTrialDetails, postDefense, getDefenses, postLike, postVote, getVoteResult, postRebuttal, postRebuttalLike, getRebuttals };