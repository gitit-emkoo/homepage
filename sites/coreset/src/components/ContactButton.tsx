"use client";

import type { ReactNode } from "react";
import { useContact } from "@/components/ContactProvider";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function ContactButton({ className, children }: Props) {
  const { openContact } = useContact();
  return (
    <button type="button" className={className} onClick={openContact}>
      {children}
    </button>
  );
}
