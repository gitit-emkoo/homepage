import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SubPageHeader from "@/components/SubPageHeader";
import VideoButton, { type GuideVideo } from "@/components/VideoButton";

export const metadata: Metadata = {
  title: "사용가이드",
  alternates: { canonical: "/guide" },
};

/** 이미지는 /images/guide/guide-01.png ~ guide-12.png 순서와 같다. */
const GUIDES: { title?: string; video?: GuideVideo }[] = [
  { title: "이용권 발행(계약)", video: { kind: "youtube", id: "9gwak0HMgC0" } },
  { title: "이용권사용 - 고객 방문 일정 등록", video: { kind: "mp4", src: "/videos/schedule-create.mp4" } },
  { title: "이용권 할인 적용 발행 및 청구서 전송" },
  { title: "이용권사용 - 고객 일정 변경", video: { kind: "mp4", src: "/videos/schedule-change.mp4" } },
  { title: "이용권 사용처리", video: { kind: "mp4", src: "/videos/pass-use.mp4" } },
  {},
  {},
  {},
  { title: "청구서 보내기", video: { kind: "mp4", src: "/videos/invoice-send.mp4" } },
  {},
  {},
  {},
];

export default function GuidePage() {
  return (
    <>
      <SubPageHeader />
      <main className="subpage guide">
        <h1 className="subpage__title">사용 가이드</h1>
        <ol className="guide__list">
          {GUIDES.map((guide, index) => {
            const title = guide.title ?? `패스북 사용 가이드 ${index + 1}`;
            return (
              <li key={index} className="guide__item">
                <Image
                  src={`/images/guide/guide-${String(index + 1).padStart(2, "0")}.png`}
                  alt={title}
                  width={1080}
                  height={1080}
                />
                {guide.video && <VideoButton className="guide__video-btn" video={guide.video} title={title} />}
              </li>
            );
          })}
        </ol>
        <ul className="guide__more">
          <li>
            <Link href="/withdraw">탈퇴방법</Link>
          </li>
          <li>구독 환불 및 취소방법</li>
        </ul>
      </main>
    </>
  );
}
