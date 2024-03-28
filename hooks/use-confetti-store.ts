import { create } from "zustand";

interface ConfettiStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useConfettiStore = create<ConfettiStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
