"use client";

import { useEffect, useRef } from "react";
import ContactForm from "@/components/ContactForm";
import { useContact } from "@/components/ContactProvider";

export default function ContactModal() {
  const { open, closeContact } = useContact();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="contact-modal" role="presentation">
      <button type="button" className="contact-modal__backdrop" aria-label="문의 창 닫기" onClick={closeContact} />
      <div
        className="contact-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <div className="contact-modal__head">
          <div>
            <p className="label">상담 문의</p>
            <h2 id="contact-modal-title" className="contact-modal__title">
              언제나 열려있습니다.
            </h2>
            <p className="contact-modal__lead">
              구상 중인 내용으로 편하게 남겨 주세요. 1–2일 내 이메일로 회신드립니다.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="contact-modal__close"
            aria-label="닫기"
            onClick={closeContact}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
