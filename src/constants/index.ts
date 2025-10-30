export const PATHS = {
  ROOT: "/",
  LOGIN: "/login",
  MY_PAGE: "/mypage",
  FIRST_TRIAL: "/first-trial",
  SECOND_TRIAL: "/second-trial",
  SECOND_TRIAL_REGISTER: "/secondtrial/register",
  SECOND_TRIAL_ROUND_ONE: "/secondtrial/1",
  THIRD_TRIAL: "/third-trial",
  DEBATE: "/debate",
} as const;

export const PATH_BUILDERS = {
  debateDetail: (id: string | number) => `${PATHS.DEBATE}/${id}`,
} as const;

// 네브바를 숨길 스텝 매핑 (경로별)
export const HIDE_NAV_STEPS_BY_PATH: Record<string, Set<string>> = {
  [PATHS.THIRD_TRIAL]: new Set(["loading", "verdict"]),
};
