import Image from "next/image";
import type { CSSProperties, ElementType, ReactNode } from "react";

type ChatTitleProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  anim?: string;
  style?: CSSProperties;
};

export default function ChatTitle({
  as: Tag = "h2",
  children,
  className = "",
  anim = "fade-in-up",
  style,
}: ChatTitleProps) {
  return (
    <div
      className={["chat-msg", "reveal", className].filter(Boolean).join(" ")}
      data-anim={anim}
      style={style}
    >
      <Image
        className="chat-msg__avatar"
        src="/images/badaya-ai-face.png"
        alt="바다야"
        width={400}
        height={400}
      />
      <Tag className="chat-msg__bubble">{children}</Tag>
    </div>
  );
}
