import Image from "next/image";

const PAIN_POINTS = [
  "바쁘고 신경 쓸 시간도 없고",
  "공고가 나한테 맞는지도 헷갈리고",
  "챙겨야 할 서류에, 작성할 문서에 복잡하고",
  "결국 나중에... 미루고 잊게 됩니다.",
];

const FLOW_STEPS = [
  { label: "바다야가 알아서 찾고", src: "/images/step-1-search.png", alt: "검색하는 바다야 캐릭터" },
  { label: "정리도 하고", src: "/images/step-2-analyze.png", alt: "정리하는 바다야 캐릭터" },
  { label: "작성도 해서", src: "/images/step-3-write.png", alt: "대화하며 작성하는 바다야와 사장님" },
  { label: "딱 준비해 드릴게요!", src: "/images/step-4-deliver.png", alt: "준비된 서류를 전달하는 바다야" },
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

        <ol className="pain__flow">
          {FLOW_STEPS.map((step, index) => (
            <li key={step.label} className="pain__flow-item">
              <span className="pain__flow-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="pain__flow-label">{step.label}</p>
              <Image
                className="pain__flow-image"
                src={step.src}
                alt={step.alt}
                width={920}
                height={1150}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
