import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const imageCards = Array.from({ length: 8 }, (_, i) => ({
  src: `/assets/young/y${i + 1}.jpg`,
}));

const ScrollGallery = () => {
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.set(".testimonials-section", { marginTop: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top top",
        end: "+=160%",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 400,
      stagger: 0.25,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="testimonials-section relative h-dvh bg-pink-100 overflow-hidden">
      {/* 타이틀: 생일 축하 문구 (정중앙 고정) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-black first-title">When</h1>
        <h1 className="text-light-brown sec-title">She Was</h1>
        <h1 className="text-black third-title">Little</h1>
      </div>

      {/* 카드 피닝 박스 (정중앙에서 위로 쌓임) */}
      <div className="pin-box relative size-full z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          {imageCards.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={
                `vd-card absolute shadow-lg rounded-xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ` +
                // 모바일: 중앙 기준 좌우 대칭으로 펼치며 위로 쌓임 + 회전 다양화
                ([
                  "w-[70vw] h-[94vw] rotate-[-3deg]",
                  "w-[70vw] h-[94vw] rotate-[2deg]",
                  "w-[70vw] h-[94vw] rotate-[-2deg]",
                  "w-[70vw] h-[94vw] rotate-[3deg]",
                  "w-[70vw] h-[94vw] rotate-[-1deg]",
                  "w-[70vw] h-[94vw] rotate-[4deg]",
                  "w-[70vw] h-[94vw] rotate-[-2deg]",
                  "w-[70vw] h-[94vw] rotate-[1deg]",
                ][index] || "w-[70vw] h-[94vw]") +
                // 데스크톱: 중앙 기준 좌우 대칭으로 펼치며 위로 쌓임 + 회전 다양화 (수직은 중앙 고정)
                " md:w-[22vw] md:h-[30vw] " +
                ([
                  "md:left-[calc(50%-14vw)] md:rotate-[-4deg]",
                  "md:left-[calc(50%-9vw)] md:rotate-[2deg]",
                  "md:left-[calc(50%-5vw)] md:rotate-[-2deg]",
                  "md:left-[calc(50%-2vw)] md:rotate-[3deg]",
                  "md:left-[calc(50%+2vw)] md:rotate-[-3deg]",
                  "md:left-[calc(50%+5vw)] md:rotate-[4deg]",
                  "md:left-[calc(50%+9vw)] md:rotate-[-2deg]",
                  "md:left-[calc(50%+14vw)] md:rotate-[2deg]",
                ][index] || "")
              }
              style={{ willChange: "transform", zIndex: index + 1 }}
            >
              <img
                loading="lazy"
                decoding="async"
                src={card.src}
                alt="memory"
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollGallery;
