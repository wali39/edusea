"use client";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import ReactConfetti from "react-confetti";

const ConfettiProvider = () => {
  const confettiControl = useConfettiStore();
  if (!confettiControl.isOpen) return null;
  return (
    <ReactConfetti
      className=" pointer-events-none z-50 "
      numberOfPieces={550}
      recycle={false}
      onConfettiComplete={() => confettiControl.onClose()}
    />
  );
};

export default ConfettiProvider;
