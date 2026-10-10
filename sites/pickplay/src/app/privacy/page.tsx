import type { Metadata } from "next";
import SubPage from "@/components/SubPage";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "픽플레이(PickPlay) 앱 개인정보처리방침",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <SubPage title="개인정보처리방침">
      <h1 className="doc__title">개인정보처리방침</h1>
      <p className="doc__meta">
        시행일자: 2025년 9월 2일
        <br />
        개정일: 2025년 9월 12일
        <br />
        주요 변경: 푸시 토큰, Firebase 익명 UID, 광고 식별자(AAID), 투표 기록 및 제3자 제공(Expo/Firebase/AdMob) 관련
        수집·이용·제공 항목 명시
      </p>
      <p>
        PickPlay(이하 &quot;회사&quot;)는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」, 「정보통신망 이용촉진 및
        정보보호 등에 관한 법률」 등 관련 법령을 준수합니다. 본 방침은 회사가 제공하는 모바일 애플리케이션 Pick-Play(이하
        &quot;서비스&quot;) 이용과 관련하여 개인정보가 어떻게 수집·이용·보관·처리되는지를 설명합니다.
      </p>

      <h2>1. 수집하는 정보</h2>
      <ul>
        <li>기기/기타 식별자: 광고 식별자(AAID), 푸시 알림 토큰(Expo/FCM), 익명 사용자 식별자(Firebase UID)</li>
        <li>
          서비스 이용 기록: 투표 기록(questionId, optionIndex, dateKey, timestamp), 알림 수신 관련 이벤트(스케줄/수신 여부)
        </li>
        <li>기기·앱 정보: OS/앱 버전, 기본 진단 정보(일부는 제3자 SDK에서 자동 수집)</li>
        <li>당사는 이름, 이메일 등 직접 식별 가능한 정보는 수집하지 않습니다.</li>
      </ul>

      <h2>2. 수집·이용 목적</h2>
      <ul>
        <li>앱 기능 제공: 푸시 알림 발송, 일일 질문 참여 중복 방지, 집계/통계 표시</li>
        <li>광고 제공 및 부정행위 방지: 광고 노출/성과 측정, 광고 사기 방지(AdMob)</li>
        <li>서비스 품질 개선 및 안정성 확보</li>
      </ul>

      <h2>3. 보유 및 파기</h2>
      <ul>
        <li>로컬 저장소(AsyncStorage) 데이터는 앱 삭제 시 기기에서 파기됩니다.</li>
        <li>Firebase에 저장되는 기록은 목적 달성 시 또는 이용자 요청 시 합리적 범위에서 삭제합니다.</li>
        <li>Google(Firebase/AdMob), Expo 등 제3자 SDK에 의해 수집/보관되는 데이터는 각사의 보유기간/정책을 따릅니다.</li>
      </ul>

      <h2>4. 제3자 제공 및 국외 이전</h2>
      <ul>
        <li>
          제공 대상 및 목적
          <ul>
            <li>Google LLC(Firebase Auth/Firestore/AdMob): 인증, 데이터 저장/집계, 광고 제공 및 부정행위 방지</li>
            <li>Expo(Notifications): 푸시 알림 토큰 발급/전달</li>
          </ul>
        </li>
        <li>이전되는 항목: 익명 UID, 푸시 토큰, 광고 식별자, 투표/이용 기록 일부, 기기/앱 정보</li>
        <li>이전 국가: 미국 등 제공업체 서버 소재지</li>
        <li>이전 시점/방법: 앱 실행 및 기능 사용 과정에서 네트워크로 전송</li>
      </ul>

      <h2>5. 이용자 선택권</h2>
      <ul>
        <li>푸시 알림: 디바이스 설정에서 권한을 변경/해제할 수 있습니다.</li>
        <li>광고 개인맞춤: 디바이스의 광고 설정에서 개인맞춤 광고를 비활성화하거나 광고 ID(AAID)를 재설정할 수 있습니다.</li>
      </ul>

      <h2>6. 안전성 확보조치</h2>
      <ul>
        <li>전송 구간 암호화(HTTPS), 접근통제, 최소 수집 원칙을 적용합니다.</li>
      </ul>

      <h2>7. 아동의 개인정보 보호</h2>
      <ul>
        <li>만 14세 미만 아동의 서비스 이용에 관한 보호자 동의 절차 또는 이용 제한 정책을 적용합니다.</li>
      </ul>

      <h2>8. 문의처</h2>
      <ul>
        <li>담당자: 구은모</li>
        <li>
          이메일: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </li>
        <li>주소/전화: 010-4857-4876</li>
      </ul>

      <h2>9. 정책 변경</h2>
      <ul>
        <li>본 방침은 서비스/법령 변경에 따라 개정될 수 있으며, 변경 사항은 본 페이지에서 고지합니다.</li>
      </ul>

      <h2>[개정 이력]</h2>
      <ul>
        <li>v1.1 (2025-09-12): 데이터 수집/공유 항목 구체화 및 목적/보유/제3자 제공 정비</li>
        <li>v1.0 (2025-09-02): 최초 제정</li>
      </ul>
    </SubPage>
  );
}
