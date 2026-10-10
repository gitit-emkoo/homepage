import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SubPageHeader from "@/components/SubPageHeader";
import { CS_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "계정삭제안내",
  alternates: { canonical: "/withdraw" },
};

const DELETED_DATA = [
  ["사용자 정보", "이름, 전화번호, 상호명, 계정 설정"],
  ["수강생 정보", "수강생 목록 및 상세 정보"],
  ["계약서", "모든 계약서 및 계약 내용"],
  ["출결 기록", "출석, 결석, 대체 등 모든 출결 기록"],
  ["정산서", "발행된 모든 정산서 및 청구서"],
  ["알림", "모든 알림 내역"],
  ["공지사항", "작성한 공지사항"],
  ["문의", "문의 내역"],
  ["일정 예외", "등록한 일정 예외 정보"],
];

export default function WithdrawPage() {
  return (
    <>
      <SubPageHeader />
      <main className="subpage withdraw">
        <h1 className="withdraw__title">계정삭제안내</h1>
        <p className="withdraw__intro">
          패스북 앱에서 계정을 삭제하고 싶으시다면, 아래 방법 중 하나를 선택하여 진행하실 수 있습니다.
        </p>

        <section className="withdraw__section">
          <h2 className="withdraw__heading">계정 삭제 방법</h2>
          <h3 className="withdraw__method">방법 1 : 앱 내에서 직접 삭제(권장)</h3>
          <ol className="withdraw__steps">
            <li>패스북 앱을 실행합니다</li>
            <li>하단 탭에서 &quot;설정&quot; 메뉴를 선택합니다</li>
            <li>화면 하단의 &quot;회원탈퇴&quot; 링크를 클릭합니다</li>
            <li>확인 메시지에서 &quot;탈퇴&quot; 버튼을 선택합니다</li>
            <li>탈퇴가 완료되면 모든 데이터가 즉시 삭제됩니다</li>
          </ol>
          <h3 className="withdraw__method">방법 2 : 이메일로 삭제 요청</h3>
          <p className="withdraw__method-desc">앱을 사용할 수 없는 경우, 아래 이메일로 계정 삭제를 요청하실 수 있습니다.</p>
          <div className="withdraw__box withdraw__box--info">
            <p>
              <strong>💡C/S 이메일:</strong> <a href={`mailto:${CS_EMAIL}`}>{CS_EMAIL}</a>
              <br />
              이메일 제목에 &quot;계정 삭제 요청&quot;을 포함해주세요. 본문에 가입 시 사용한 전화번호를 알려주시면 빠르게
              처리해드립니다.
            </p>
          </div>
          <div className="withdraw__box withdraw__box--warning">
            <p>
              <span className="withdraw__warning-title">주의사항</span>
              계정 삭제 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다. 신중하게 결정해주세요.
            </p>
          </div>
        </section>

        <section className="withdraw__section">
          <h2 className="withdraw__heading">삭제되는 데이터</h2>
          <p className="withdraw__body">계정 삭제 시 다음 데이터가 모두 삭제됩니다:</p>
          <ul className="withdraw__data">
            {DELETED_DATA.map(([label, desc]) => (
              <li key={label}>
                <strong>{label}:</strong> {desc}
              </li>
            ))}
          </ul>
        </section>

        <section className="withdraw__section">
          <h2 className="withdraw__heading">데이터 보관 기간</h2>
          <p className="withdraw__body">
            계정 삭제 요청이 완료되면 <strong>즉시 모든 데이터가 완전히 삭제</strong>됩니다.
            <br />
            추가 보관 기간은 없으며, 삭제된 데이터는 복구할 수 없습니다.
          </p>
        </section>

        <section className="withdraw__section">
          <h2 className="withdraw__heading">문의사항</h2>
          <p className="withdraw__body">
            계정 삭제와 관련하여 궁금한 사항이 있으시면 언제든지 문의해주세요.
            <br />
            <strong>이메일:</strong> <a href={`mailto:${CS_EMAIL}`}>{CS_EMAIL}</a>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
