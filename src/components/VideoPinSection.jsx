import React, { useRef, useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const VideoPinSection = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const handleToggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      const ensurePlay = () => {
        const p = v.play?.();
        if (p && typeof p.then === "function") {
          return p.catch(() => {
            v.muted = true;
            return v.play().then(() => Promise.resolve());
          });
        }
        return Promise.resolve();
      };

      // Toggle muted state on user gesture
      const nextMuted = !v.muted;
      if (!nextMuted) {
        // Unmuting: set volume and remove attribute for Safari/iOS quirk
        v.volume = 1;
        v.removeAttribute && v.removeAttribute("muted");
      }
      v.muted = nextMuted;
      setMuted(nextMuted);

      // Make sure it's playing so the change is audible
      ensurePlay();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useGSAP(() => {
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "top top",
          end: "+=100%",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power1.inOut",
      });
    }
  });

  // Keep local state in sync if something else changes volume/muted
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onChange = () => setMuted(v.muted);
    v.addEventListener("volumechange", onChange);
    return () => v.removeEventListener("volumechange", onChange);
  }, []);

  return (
    <section className="vd-pin-section">
      <div
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)"
            : "circle(6% at 50% 50%)",
        }}
        className="size-full video-box"
      >
        <video
          ref={videoRef}
          src="/videos/pino-video.mp4"
          playsInline
          muted
          loop
          autoPlay
        />

        <div className="abs-center md:scale-100 scale-200">
          <img
            src="/images/circle-text.svg"
            alt=""
            className="spin-circle"
            loading="lazy"
            decoding="async"
          />
          <div
            className="play-btn"
            role="button"
            tabIndex={0}
            aria-pressed={!muted}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            onClick={handleToggleSound}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleToggleSound();
            }}
          >
            <img
              loading="lazy"
              decoding="async"
              src="/images/play.svg"
              alt=""
              className="size-[3vw] ml-[.5vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
