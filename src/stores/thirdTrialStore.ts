import { create } from "zustand";

export type ThirdTrialStep =
  | "adopt"      // 변론 채택
  | "waiting"    // 판결 대기
  | "loading"    // 판결 로드(애니메이션)
  | "verdict";   // 판결

type ThirdTrialState = {
  step: ThirdTrialStep;
  setStep: (step: ThirdTrialStep) => void;
  reset: () => void;
};

export const useThirdTrialStore = create<ThirdTrialState>((set) => ({
  step: "adopt",
  setStep: (step) => set({ step }),
  reset: () => set({ step: "adopt" }),
}));
