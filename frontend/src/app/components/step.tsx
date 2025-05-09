// lib/store/useStepStore.ts
import { create } from "zustand";

type StepStore = {
  step: string;
  setStep: (newStep: string) => void;
};

const useStepStore = create<StepStore>((set) => ({
  step: "home",
  setStep: (newStep) => set({ step: newStep }),
}));

export default useStepStore;
