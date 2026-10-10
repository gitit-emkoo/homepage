import Image from "next/image";
import AppDownloadButton from "@/components/AppDownloadButton";

export default function LaunchEvent() {
  return (
    <section className="event">
      <div className="event__inner">
        <Image
          className="event__image"
          src="/images/event.jpg"
          alt="출시 이벤트: 이벤트 기간 앱 다운 즉시 실전플랜 무료이용권 2회 지급"
          width={1007}
          height={534}
        />
        <AppDownloadButton className="btn--event">내가 받을수있는 돈 확인하기</AppDownloadButton>
      </div>
    </section>
  );
}
