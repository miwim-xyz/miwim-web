"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min((window.scrollY / docHeight) * 100, 100));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[100] h-[3px]"
      style={{ background: "transparent" }}
    >
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #2aa198 0%, #268bd2 50%, #d33682 100%)",
          boxShadow: progress > 0 ? "0 0 8px rgba(42, 161, 152, 0.4)" : "none",
        }}
      />
    </div>
  );
}
