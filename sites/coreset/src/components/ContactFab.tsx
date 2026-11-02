"use client";

import { useContact } from "@/components/ContactProvider";

export default function ContactFab() {
  const { open, openContact } = useContact();
  if (open) return null;

  return (
    <button type="button" className="contact-fab" onClick={openContact}>
      문의
    </button>
  );
}
