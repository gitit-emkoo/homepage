const PAIN_POINTS = [
  '😒" 자영업도 되는지 잘 몰랐어요 "',
  "🙁“ 조건에 맞는 공고 찾기가 번거로워요 ”",
  "😞“ 작성할 서류가 막막해서 그냥 포기했어요 ”",
  '😒" 혼자는 막막하고 컨설팅은 비용이 부담돼요 "',
];

export default function PainPoints() {
  return (
    <section className="pain">
      <div className="container">
        <h2 className="pain__title">
          누구나 가능한 주인없는 돈
          <br />
          그동안 왜 못받을까?
        </h2>
        <hr className="pain__divider" />
        <div className="pain__card">
          <p className="pain__card-title">정부 혜택 남들 이야기인줄 알았어요!</p>
          <ul className="pain__list">
            {PAIN_POINTS.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
        <p className="pain__answer">
          <span>BADAYA 에서는 누구나</span>
          <br />
          떠 먹는 수준으로&nbsp; 쉽게
        </p>
      </div>
    </section>
  );
}
