import Image from "next/image";

const CASES = [
  { icon: "/images/emoji-tired.png", text: "쓰지도 않는 기능들 때문에 비용이 부담돼요" },
  { icon: "/images/emoji-annoyed.png", text: "단골 관리가 중요한 소규모 매장이에요" },
  { icon: "/images/emoji-scream.png", text: "고객과 불필요한 감정 소모하고 싶지 않아요" },
  { icon: "/images/emoji-annoyed.png", text: "매번 기록 찾아보고 기억하는게 번거로워요" },
];

export default function Enough() {
  return (
    <section className="enough">
      <div className="container">
        <h2 className="enough__title">
          PassBook이면 <span className="highlight">충분해요</span>
        </h2>
        <ul className="enough__list">
          {CASES.map((item) => (
            <li key={item.text} className="enough__item">
              <span className="enough__icon">
                <Image src={item.icon} alt="" width={120} height={120} />
              </span>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
