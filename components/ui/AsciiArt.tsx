import { type ClassValue, clsx } from "clsx";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AsciiArtProps {
  frames: string[];
  intervalMs?: number;
  className?: string;
}

export function AsciiArt({
  frames,
  intervalMs = 600,
  className,
}: AsciiArtProps) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (frames.length <= 1) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [frames, intervalMs]);

  return (
    <pre className={cn("font-mono whitespace-pre overflow-hidden", className)}>
      {frames[frameIndex]}
    </pre>
  );
}
