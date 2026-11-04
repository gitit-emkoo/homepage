import AppDownloadButton from "@/components/AppDownloadButton";
import ChatTitle from "@/components/ChatTitle";
import Image from "next/image";

export default function LaunchEvent() {
  return (
    <section className="event">
      <div className="event__inner">
        <ChatTitle>
          사업하며 당연히 받을 권리를
          <br />
          절대 포기하지 마세요
        </ChatTitle>
        <Image
          className="event__image"
          src="/images/event.png"
          alt="혜택을 떠 먹여 주는 바다야"
          width={819}
          height={1024}
        />
        <AppDownloadButton className="btn--event">지원금 빠르게 찾아보기</AppDownloadButton>
      </div>
    </section>
  );
}
