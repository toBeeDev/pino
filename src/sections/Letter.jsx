import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Letter = () => {
  const text = ``;
  const aboutText = `자기가 내 생일을 축하해줬던게 엊그제 같은데 벌써 자기 생일이 다가왔다니! 매일매일 
⚡️ Open-sourcing my latest experiment (or hacking on yours)
🎥 Teaching devs on Twitch/YouTube—because rising tides lift all ships
🧗 Rock climbing (problem-solving with real stakes)
🎸 Strumming chords while CI pipelines pass (multitasking at its finest)`;
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
    <section id="about" className="min-h-[100dvh] rounded-4xl bg-pink-50">
      <AnimatedHeaderSection
        title={"Birthday Letter"}
        text={text}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl">
        <img
          ref={imgRef}
          src="images/hero.jpg"
          alt="man"
          className="w-md rounded-3xl"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default Letter;
