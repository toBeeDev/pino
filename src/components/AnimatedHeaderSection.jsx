import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  pt = "pt-16",
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
            start: "top 92%",
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "25vh",
      duration: 0.7,
      ease: "power3.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "100",
        duration: 0.6,
        ease: "power3.out",
      },
      "<+0.1"
    );
  }, []);
  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className={`flex flex-col justify-center ${pt} gap-5`}
        >
          <p
            className={`text-md font-bold tracking-[0.1rem] uppercase px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-10">
            <h1
              className={`flex flex-col gap-0 banner-text-responsive sm:gap-5 md:block ${textColor}`}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-10 ${textColor}`}>
        <div className="py-6 sm:py-10 text-end">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
            withScrollTrigger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
