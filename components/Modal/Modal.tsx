"use client";

import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void; 
}

export default function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();
  const handleDismiss = onClose || (() => router.back());

  return (
    <div className={css.overlay} onClick={handleDismiss}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}