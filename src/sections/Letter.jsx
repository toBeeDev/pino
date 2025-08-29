import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Letter = () => {
  const text = `From. 승찬`;
  const aboutText = `
  솔아, 생일 정말 축하해. 벌써 솔이 생일이라니 시간이 너무 빠르다. 내 생일 축하를 받았던 게 엊그제 같은데, 솔이 생일을 축하하고 있다니!!! 이번 생일을 맞아 솔이를 위한 선물을 준비하면서, 우리의 첫 만남을 많이 떠올렸 것 같아. 추운 겨울, 수원에서 서울까지 그리고 집순이 솔이가 나를 만나러 서울에 온 날. 그 날이 아직도 내 기억 속에 선명한 것 같아. 사실 나는 운명을 그다지 믿지 않았는데, 우리를 생각하면 '우린 운명이 아니였을까?'라는 생각이 들어.  솔이도 얘기했지만 너무 많은 우연들이 겹쳐서 지금의 우리가 만났다는 사실이 참 신기하고도 소중해. 함께한 시간이 쌓이면서 우리 사이도 많이 성장한 것 같아. 예전엔 조금 어색했던 표현들이 이젠 너무 자연스럽고, 솔이가 하루하루 나를 챙겨주는 모습에 항상 고맙고 행복해. 솔이의 다정한 말투, 나의 하루를 궁금해하고 내가 부족한 점이 많음에도 불구하고 항상 이뻐해주는 솔이에게 늘 감사하고 있어. 앞으로도 솔이와 항상 함께 하고싶어. 슬플 때든, 기쁠 때든, 늘 옆에 있을게. 다시 한번, 생일 진심으로 축하해.`;
  const imgRef = useRef(null);
  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.98,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 90%",
        end: "bottom 30%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: imgRef.current, start: "top 95%" },
    });
  });
  return (
    <section
      id="about"
      className="rounded-4xl bg-[url('/images/letter-bg.png')] bg-cover bg-center bg-repeat relative"
    >
      <div className="absolute inset-0 bg-white/60 rounded-4xl"></div>
      <div className="relative z-10">
        <AnimatedHeaderSection
          title={"Letter For You"}
          text={text}
          withScrollTrigger={true}
          pt="pt-4"
        />
        <div className="flex flex-col items-center justify-between gap-16 px-8 pb-16 tracking-wide lg:flex-row">
          <img
            ref={imgRef}
            src="images/hero.jpg"
            alt="man"
            onLoad={() => ScrollTrigger.refresh()}
            className="w-md rounded-3xl"
          />
          <AnimatedTextLines text={aboutText} className={"w-full"} />
        </div>
      </div>
    </section>
  );
};

export default Letter;
