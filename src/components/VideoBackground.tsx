"use client";

import { useRef, useEffect } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const update = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0 && video.duration) {
        video.currentTime = (scrollTop / maxScroll) * video.duration;
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: -10 }} aria-hidden="true">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg-video.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
