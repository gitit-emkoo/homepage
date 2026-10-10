import Image from "next/image";

const POINTS = [
  { icon: "/images/point-proof.gif", text: "언제든 설명이 아닌 증명 할 수 있고" },
  { icon: "/images/point-mobile.gif", text: "PC 필요 없이 손안에서 처리하는" },
  { icon: "/images/point-prepaid.gif", text: "선불 관리에 최적화된 앱" },
];

export default function Points() {
  return (
    <>
      <section className="band band--slim">
        <h2 className="band__text">Pass Book 은</h2>
      </section>

      <section className="points">
        <ul className="container points__list">
          {POINTS.map((point) => (
            <li key={point.text} className="point">
              <span className="point__icon">
                <Image src={point.icon} alt="" width={300} height={300} />
              </span>
              <p className="point__text">{point.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
