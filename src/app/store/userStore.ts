import { create } from "zustand";

interface State {
  id: number | null;
  tagName: string | null;
  setId: (id: number) => void;
  setTagName: (tagName: string) => void;
}

export const useUserStore = create<State>()((set) => ({
  id: null,
  tagName: null,
  setId: (id) => set({ id }),
  setTagName: (tagName) => set({ tagName }),
}));
