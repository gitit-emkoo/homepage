import FlowProcess from "@/components/FlowProcess";

const PAIN_POINTS = [
  "바쁘고 신경 쓸 시간도 없고",
  "공고가 나한테 맞는지도 헷갈리고",
  "챙겨야 할 서류에, 작성할 문서에 복잡하고",
  "결국 나중에... 미루고 잊게 됩니다.",
];

export default function PainPoints() {
  return (
    <section className="pain">
      <div className="container">
        <h2 className="pain__title">
          평균 <em>280만원</em> 혜택을 왜 못받을까?
        </h2>
        <hr className="pain__divider" />
        <div className="pain__card">
          <ul className="pain__list">
            {PAIN_POINTS.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
        <p className="pain__answer">
          기회는 점점 더 많아지는데
          <br />
          <span>챙길 여유는 더 없어지는 대표님!</span>
        </p>

        <h3 className="pain__flow-title">대화하고 제출만 하세요</h3>

        <FlowProcess />
      </div>
    </section>
  );
}
