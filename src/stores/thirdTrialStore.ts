import { create } from "zustand";

export type ThirdTrialStep =
  | "adopt"      // 변론 채택
  | "waiting"    // 판결 대기
  | "loading"    // 판결 로드(애니메이션)
  | "verdict";   // 판결

type ThirdTrialState = {
  step: ThirdTrialStep;
  setStep: (step: ThirdTrialStep) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
};

const order: ThirdTrialStep[] = ["adopt", "waiting", "loading", "verdict"];

export const useThirdTrialStore = create<ThirdTrialState>((set, get) => ({
  step: "adopt",
  setStep: (step) => set({ step }),
  next: () => {
    const current = get().step;
    const idx = order.indexOf(current);
    const next = order[Math.min(idx + 1, order.length - 1)];
    if (next !== current) set({ step: next });
  },
  prev: () => {
    const current = get().step;
    const idx = order.indexOf(current);
    const prev = order[Math.max(idx - 1, 0)];
    if (prev !== current) set({ step: prev });
  },
  reset: () => set({ step: "adopt" }),
}));

