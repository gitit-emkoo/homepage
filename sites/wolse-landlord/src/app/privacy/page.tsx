import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 월세 스위치",
  description: "월세 스위치 상담 신청 개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <h1>개인정보처리방침</h1>
      <p>월세 스위치는 파트너·매물 상담을 위해 아래와 같이 개인정보를 처리합니다.</p>
      <h2>수집 항목</h2>
      <p>이름, 상호, 연락처, 이메일, 지역, 매물 정보</p>
      <h2>수집 목적</h2>
      <p>파트너 상담 및 서비스 안내</p>
      <h2>보유 기간</h2>
      <p>상담 종료 후 1년 또는 동의 철회 시까지</p>
      <h2>동의 거부</h2>
      <p>개인정보 수집·이용에 동의하지 않을 수 있으며, 거부 시 상담 신청이 불가합니다.</p>
      <p>
        <a href="/">홈으로</a>
      </p>
    </main>
  );
}
