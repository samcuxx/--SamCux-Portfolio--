import { create } from "zustand";

type TransitionStore = {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
};

export const useTransitionStore = create<TransitionStore>((set) => ({
  isTransitioning: false,
  startTransition: () => set({ isTransitioning: true }),
  endTransition: () => set({ isTransitioning: false }),
}));
