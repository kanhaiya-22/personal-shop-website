"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cinematic, muted, looping showcase video.
 * - Plays only while on screen (saves data and battery on phones)
 * - Never autoplays for visitors who prefer reduced motion
 * - Always has a visible pause / play control (WCAG 2.2.2)
 */
export function VideoShowcase({
  src,
  poster,
  label,
  playLabel,
  pauseLabel,
  children,
}: {
  src: string;
  poster?: string;
  label: string;
  playLabel: string;
  pauseLabel: string;
  children?: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) video.play().catch(() => undefined);
        else if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      io.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      void video.play();
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-700 to-navy-950 shadow-lift">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-navy-950/10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/60 to-transparent" />
      {children}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className={cn(
          "absolute right-4 bottom-4 grid size-12 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur-md transition hover:scale-105 hover:bg-white/25 sm:right-6 sm:bottom-6",
        )}
      >
        {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5 translate-x-px" aria-hidden="true" />}
      </button>
    </div>
  );
}
