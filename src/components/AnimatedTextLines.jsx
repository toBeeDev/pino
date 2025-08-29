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
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
      };
      if (withScrollTrigger) {
        gsap.from(lineRefs.current, {
          ...base,
          immediateRender: true,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
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
        <p
          key={index}
          ref={(el) => (lineRefs.current[index] = el)}
          className="block text-md md:text-2xl font-[500]"
        >
          {line}
        </p>
      ))}
    </div>
  );
};
