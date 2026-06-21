"use client";

import { useEffect, useState } from "react";

/**
 * Loss curve from a typical fine-tuning run, plotted against iteration. The
 * first iterations are densely sampled and drop sharply (the vertical arm of
 * the "L"), then loss plateaus across the rest of the run (the horizontal arm).
 */
const POINTS = [
  { iter: 2, loss: 1.07 },
  { iter: 4, loss: 0.78 },
  { iter: 6, loss: 0.56 },
  { iter: 9, loss: 0.41 },
  { iter: 12, loss: 0.31 },
  { iter: 16, loss: 0.26 },
  { iter: 26, loss: 0.225 },
  { iter: 40, loss: 0.205 },
  { iter: 56, loss: 0.192 },
  { iter: 74, loss: 0.181 },
  { iter: 94, loss: 0.171 },
  { iter: 114, loss: 0.163 },
  { iter: 132, loss: 0.156 },
  { iter: 150, loss: 0.15 },
];
const TOTAL_ITERATIONS = 150;
const MAX_LOSS = 1.07;
const MIN_LOSS = 0.15;
const BAR_CELLS = 20;
const STEP = 6;
/** Extra iterations to hold the completed run before the loop restarts. */
const HOLD = 60;
/** Accent colour shared by the title and the highlighted values. */
const ACCENT = "text-green-600 dark:text-green-400";

export default function NanotuneTerminal() {
  const [iter, setIter] = useState(TOTAL_ITERATIONS);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setPrefersReducedMotion(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    );
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (prefersReducedMotion) {
      setIter(TOTAL_ITERATIONS);
      return;
    }

    const interval = setInterval(() => {
      setIter((prev) => (prev >= TOTAL_ITERATIONS + HOLD ? 0 : prev + STEP));
    }, 190);

    return () => clearInterval(interval);
  }, [isMounted, prefersReducedMotion]);

  const currentIter = Math.min(iter, TOTAL_ITERATIONS);
  const progress = Math.round((currentIter / TOTAL_ITERATIONS) * 100);
  const matched = POINTS.filter((p) => p.iter <= currentIter);
  const visible = matched.length ? matched : [POINTS[0]];
  const trainLoss = visible[visible.length - 1].loss;
  const filledCells = Math.round((progress / 100) * BAR_CELLS);

  const coords = visible.map((p) => ({
    x: 7 + (p.iter / TOTAL_ITERATIONS) * 88,
    y: 8 + ((MAX_LOSS - p.loss) / (MAX_LOSS - MIN_LOSS)) * 84,
  }));

  return (
    <div className="border border-black bg-white text-zinc-800 dark:border-white/20 dark:bg-black dark:text-zinc-200">
      <div className="p-4 sm:p-6 font-mono text-[10px] sm:text-xs leading-5 w-full">
        <div className={`font-bold ${ACCENT}`}>Nanotune - Training</div>
        <div className="h-4" />

        <div>
          Model:{" "}
          <span className={ACCENT}>Qwen/Qwen2.5-Coder-1.5B-Instruct</span>
        </div>
        <div>
          Examples: <span className={ACCENT}>782</span>
        </div>
        <div>
          Iterations: <span className={ACCENT}>{TOTAL_ITERATIONS}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Progress:</span>
          <span className="whitespace-pre tracking-tighter">
            <span className="text-green-600 dark:text-green-500">
              {"█".repeat(filledCells)}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">
              {"█".repeat(BAR_CELLS - filledCells)}
            </span>
          </span>
          <span className={ACCENT}>{progress}%</span>
        </div>
        <div>
          Iteration:{" "}
          <span className={ACCENT}>
            {currentIter}/{TOTAL_ITERATIONS}
          </span>
        </div>
        <div className="h-4" />

        <div className="font-bold mb-1">Training Loss</div>
        <div className="flex gap-2">
          <div className="flex flex-col justify-between text-[9px] sm:text-[10px]">
            <span>{MAX_LOSS.toFixed(2)}</span>
            <span>{trainLoss.toFixed(2)}</span>
          </div>
          <div className="relative w-36 sm:w-44 h-16 sm:h-20 border border-zinc-300 dark:border-zinc-700">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline
                points={coords.map((c) => `${c.x},${c.y}`).join(" ")}
                fill="none"
                className="stroke-green-600 dark:stroke-green-500"
                strokeWidth={1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {coords.map((c, i) => (
              <span
                key={visible[i].iter}
                className="absolute w-1 h-1 rounded-full bg-green-600 dark:bg-green-500 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
              />
            ))}
          </div>
        </div>
        <div className="h-2" />

        <div>
          Train Loss:{" "}
          <span className="font-bold text-green-600 dark:text-green-400">
            {trainLoss.toFixed(4)}
          </span>
        </div>
        <div className="h-4" />

        <div className="text-zinc-400 dark:text-zinc-500">
          [Ctrl+C] Stop training (checkpoint saved)
        </div>
      </div>
    </div>
  );
}
