export const PATHS = {
  ROOT: "/",
  LOGIN: "/login",
  MY_PAGE: "/mypage",
  THIRD_TRIAL: "/third-trial",
} as const;

// 네브바를 숨길 스텝 매핑 (경로별)
// 스텝 값은 문자열로 관리하여 스토어와의 결합을 느슨하게 유지합니다.
export const HIDE_NAV_STEPS_BY_PATH: Record<string, Set<string>> = {
  [PATHS.THIRD_TRIAL]: new Set(["loading", "verdict"]),
};