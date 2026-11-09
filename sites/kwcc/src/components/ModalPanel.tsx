"use client";

import { useEffect, type ReactNode } from "react";

type ModalPanelProps = {
  open: boolean;
  title: string;
  index: string;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalPanel({ open, title, index, onClose, children }: ModalPanelProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal" role="presentation">
      <button type="button" className="modal__backdrop" aria-label="닫기" onClick={onClose} />
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal__head">
          <div>
            <p className="modal__index">{index}</p>
            <h2 className="modal__title" id="modal-title">
              {title}
            </h2>
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="닫기">
            Close
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
}
