import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export const AnimatedTextLines = ({
  text,
  className,
  withScrollTrigger = false,
}) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      const base = {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
      };
      if (withScrollTrigger) {
        gsap.from(lineRefs.current, {
          ...base,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      } else {
        gsap.from(lineRefs.current, base);
      }
    }
  });

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block leading-relaxed tracking-wide text-pretty"
        >
          {line}
        </span>
      ))}
    </div>
  );
};
