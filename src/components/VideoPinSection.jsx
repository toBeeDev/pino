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
      // 다음 상태(음소거 여부)를 먼저 계산
      const nextMuted = !v.muted;

      // 음소거 해제 시 볼륨 설정 및 Safari/iOS 처리
      if (!nextMuted) {
        v.volume = 1;
        v.removeAttribute && v.removeAttribute("muted");
      }

      // 음소거 상태를 반영하고 로컬 상태도 동기화
      v.muted = nextMuted;
      setMuted(nextMuted);

      // 음소거 여부에 따라 재생/일시정지 동작도 함께 토글
      if (nextMuted) {
        // 음소거로 전환되면 영상도 일시정지
        v.pause?.();
      } else {
        // 음소거 해제되면 영상 재생 보장
        const p = v.play?.();
        if (p && typeof p.then === "function") {
          p.catch(() => {
            // 드물게 브라우저 정책으로 실패 시, 다시 음소거 후 재생 시도
            v.muted = true;
            setMuted(true);
            return v.play?.();
          });
        }
      }
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
            {muted ? (
              <img
                src="/images/play.png"
                alt=""
                className="size-[3vw] ml-[.5vw]"
              />
            ) : (
              <img
                src="/images/pause.png"
                alt=""
                className="size-[3vw] ml-[.5vw]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
