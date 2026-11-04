import Image from "next/image";
import AppDownloadButton from "@/components/AppDownloadButton";

export default function LaunchEvent() {
  return (
    <section className="event">
      <div className="event__inner">
        <h2 className="event__title">
          사업하며 당연히 받을 권리를
          <br />
          절대 포기하지 마세요
        </h2>
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
