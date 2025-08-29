import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VideoPinSection from "../components/VideoPinSection";

const Video = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .fromTo(
        ".benefit-section .scroll-indicator",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
  });

  return (
    <section className="benefit-section bg-pink-100">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <div className="mt-16 md:mt-20 col-center">
            <ClipPathTitle
              title={"1999.08.30"}
              color={"#2E2D2F"}
              bg={"#EB88E1"}
              className={"first-title"}
              borderColor={"#FFFFFF"}
            />
            <ClipPathTitle
              title={"YI SOL"}
              color={"#2E2D2F"}
              bg={"#54BF43"}
              className={"second-title"}
              borderColor={"#FFFFFF"}
            />
            <ClipPathTitle
              title={"INTJ - strategist"}
              color={"#2E2D2F"}
              bg={"#CDD459"}
              className={"third-title"}
              borderColor={"#FFFFFF"}
            />
            <ClipPathTitle
              title={"MY LOVE"}
              color={"#2E2D2F"}
              bg={"#FF0000"}
              className={"fourth-title"}
              borderColor={"#FFFFFF"}
            />
          </div>

          <div className="md:pt-20 pt-20 scroll-down scroll-indicator opacity-0">
            <div className="flex flex-col items-center gap-2 text-[#222123]">
              <span className="text-2xl md:text-5xl uppercase">
                Scroll down
              </span>
              <svg
                className="arrow-down"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14m0 0l-6-6m6 6l6-6"
                  stroke="#222123"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

export default Video;
