import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = {
  title: "신뢰운영원칙",
  description: "픽플레이의 '투명한 보상'과 '개인정보 보호'에 대한 약속",
  alternates: { canonical: "/trust" },
};

export default function TrustPage() {
  return (
    <SubPage title="신뢰운영원칙">
      <h1 className="doc__h">우리 서비스의 &apos;투명한 보상&apos;과 &apos;개인정보 보호&apos;에 대한 약속</h1>
      <p>
        안녕하세요, <strong>PICKPLAY</strong> 팀입니다. 저희 서비스를 믿고 이용해 주시는 유저 여러분께 감사드립니다.
        저희는 여러분의 소중한 시간과 노력을 가치 있게 돌려드리기 위해, 다음과 같은 <strong>&apos;신뢰 운영 원칙&apos;</strong>을
        철저히 준수합니다.
      </p>

      <h2>
        1. 철저한 익명성 및 개인정보 보호 <small>(Privacy First)</small>
      </h2>
      <ul>
        <li>
          <strong>익명 로그인 지원:</strong> 저희는 불필요한 회원가입 절차 없이 <strong>익명 로그인</strong>으로 서비스를 시작할
          수 있습니다. 유저님의 사생활을 존중하며, 최소한의 정보로도 모든 혜택을 누리실 수 있습니다.
        </li>
        <li>
          <strong>개인정보 유출 제로:</strong> 수집된 최소한의 정보는 보상 발송 이외의 목적으로 절대 사용되지 않으며, 외부
          판매나 유출 없이 안전하게 보호됩니다.
        </li>
      </ul>

      <h2>
        2. 금융 정보 요구 없는 안전한 보상 <small>(Security)</small>
      </h2>
      <ul>
        <li>
          <strong>계좌번호 NO:</strong> 민감한 금융 정보(계좌번호, 예금주 실명 등)를 요구하지 않습니다. 정보 유출 걱정 없이
          안심하고 활동하세요.
        </li>
        <li>
          <strong>필요한 정보만 YES:</strong> 보상 발송을 위한 최소한의 연락처(핸드폰 번호 또는 이메일)와 본인 식별을 위한
          UID만 확인하여 보상을 전달합니다.
        </li>
      </ul>

      <h2>
        3. 보상의 가치와 확실한 지급 <small>(Reliability)</small>
      </h2>
      <ul>
        <li>
          <strong>진짜 쓸 수 있는 가치:</strong> 앱 내 숫자에 불과한 포인트가 아니라, 편의점/카페 등 실생활에서 바로 사용
          가능한 <strong>실물 기프티콘</strong>으로 교환해 드립니다.
        </li>
        <li>
          <strong>지급 약속:</strong> 보상 신청 시, 영업일 기준 <strong>3일</strong> 이내에 발송을 완료하며, 지연 시 사전에
          공지하고 24시간 이내에 문의에 답변하겠습니다.
        </li>
      </ul>

      <h2>
        4. 끊임없는 서비스 확장 계획 <small>(Future Roadmap)</small>
      </h2>
      <ul>
        <li>
          <strong>보상 라인업 확대:</strong> 현재 제공되는 품목 외에도 유저분들이 원하는 다양한 종류의 모바일 상품권을
          지속적으로 추가할 예정입니다.
          <br />
          <span className="doc__fine">* 내부 사정에 따라 도입 시기는 변동될 수 있습니다</span>
        </li>
        <li>
          <strong>편의성 강화:</strong> 더욱 편리한 보상 경험을 위해 <strong>네이버페이 포인트, 카카오 송금 링크</strong> 등
          다양한 지급 방식을 이미 도입 확정하여 준비 중입니다.
        </li>
      </ul>

      <h2>
        5. 내부 심의 및 법규 준수 <small>(Compliance)</small>
      </h2>
      <ul>
        <li>
          본 가이드는 운영팀의 내부 심의를 거쳐 확정되었으며, 모든 이벤트와 보상 프로세스는 관련 법규(표시광고법, 개인정보
          보호법 등)를 준수합니다.
        </li>
      </ul>
    </SubPage>
  );
}
