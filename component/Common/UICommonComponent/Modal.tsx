"use client";

import { ReactNode } from "react";
import Button from "./Button";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({
  title,
  isOpen,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#1a1a1a] w-full max-w-md rounded-xl relative border border-white/20 shadow-xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
        {title && (
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
            {title}
          </h2>
        )}

        {children}

        <Button
          variant="outline"
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl hover:text-red-400"
        >
          &times;
        </Button>
      </div>
    </div>
  );
}
