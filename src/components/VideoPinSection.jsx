import React, { useRef, useCallback, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const VideoPinSection = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // 비디오 지연 로딩
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            const video = videoRef.current;
            // WebM 포맷을 우선 시도하고, 실패 시 MP4로 폴백
            const webmSource = document.createElement("source");
            webmSource.src = "/videos/pino-video.webm";
            webmSource.type = "video/webm";

            const mp4Source = document.createElement("source");
            mp4Source.src = "/videos/pino-video.mp4";
            mp4Source.type = "video/mp4";

            video.appendChild(webmSource);
            video.appendChild(mp4Source);

            video.load();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
    console.warn("비디오 로딩 실패, 대체 이미지로 폴백");
  }, []);

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
        {!videoError ? (
          <video
            ref={videoRef}
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            style={{
              opacity: isVideoLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ) : (
          <img
            src="/images/hero.jpg"
            alt="대체 이미지"
            className="w-full h-full object-cover"
          />
        )}

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
                loading="lazy"
              />
            ) : (
              <img
                src="/images/pause.png"
                alt=""
                className="size-[3vw] ml-[.5vw]"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
