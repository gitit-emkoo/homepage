import Image from "next/image";

const FLOW_STEPS = [
  { label: "바다야가 알아서 찾고", src: "/images/step-1-search.png", alt: "검색하는 바다야 캐릭터" },
  { label: "정리도 하고", src: "/images/step-2-analyze.png", alt: "정리하는 바다야 캐릭터" },
  { label: "작성도 해서", src: "/images/step-3-write.png", alt: "대화하며 작성하는 바다야와 사장님" },
  { label: "딱 준비해 드릴게요!", src: "/images/step-4-deliver.png", alt: "준비된 서류를 전달하는 바다야" },
] as const;

export default function FlowProcess() {
  return (
    <ol className="flow-process">
      {FLOW_STEPS.map((step, index) => (
        <li key={step.label} className="flow-process__item">
          <p className="flow-process__step">Step {String(index + 1).padStart(2, "0")}</p>
          <h4 className="flow-process__label">{step.label}</h4>
          <Image
            className="flow-process__image"
            src={step.src}
            alt={step.alt}
            width={920}
            height={1150}
          />
        </li>
      ))}
    </ol>
  );
}
