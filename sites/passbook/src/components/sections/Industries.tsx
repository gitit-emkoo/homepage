import Image from "next/image";
import { reveal } from "@/lib/anim";

const INDUSTRIES = [
  { name: "뷰티케어", icon: "/images/industry-beauty.gif" },
  { name: "필라테스", icon: "/images/industry-pilates.gif" },
  { name: "헤어Shop", icon: "/images/industry-hair.gif" },
  { name: "PT", icon: "/images/industry-pt.gif" },
  { name: "개인레슨", icon: "/images/industry-lesson.gif" },
  { name: "네일아트", icon: "/images/industry-nail.gif" },
];

export default function Industries() {
  return (
    <section className="industries">
      <div className="container">
        <h2 className="industries__title reveal" {...reveal("fade-in-up", 1000)}>
          아래 업종이라면 바로 적용 해 보세요
        </h2>
        <ul className="industries__grid">
          {INDUSTRIES.map((item) => (
            <li key={item.name} className="industry">
              <Image src={item.icon} alt="" width={640} height={640} />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
