import { type ClassValue, clsx } from "clsx";
import type React from "react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TerminalLine {
  text: React.ReactNode;
  rawText?: string; // used for typing effect
  isCommand?: boolean;
  delay?: number; // Delay in ms before showing this line (for typing effect)
  color?: string; // e.g. text-[#0000EE], text-[#008000]
}

interface TerminalProps {
  title?: string;
  lines: TerminalLine[];
  className?: string;
  animate?: boolean;
}

export function Terminal({
  title = "Nano Terminal",
  lines,
  className,
  animate = true,
}: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(
    animate ? 0 : lines.length,
  );
  const [currentLineText, setCurrentLineText] = useState("");

  useEffect(() => {
    if (!animate) {
      setVisibleLines(lines.length);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const processNextLine = async () => {
      if (visibleLines >= lines.length) return;

      const line = lines[visibleLines];
      const delay = line.delay || (line.isCommand ? 50 : 20);

      if (line.isCommand) {
        const textToType =
          line.rawText || (typeof line.text === "string" ? line.text : "");
        // Typing effect for commands
        for (let i = 0; i <= textToType.length; i++) {
          setCurrentLineText(textToType.substring(0, i));
          await new Promise((r) => setTimeout(r, delay));
        }
        setVisibleLines((prev) => prev + 1);
        setCurrentLineText("");
      } else {
        // Instant appearance for output
        await new Promise((r) => setTimeout(r, delay));
        setVisibleLines((prev) => prev + 1);
      }
    };

    timeoutId = setTimeout(processNextLine, 0);

    return () => clearTimeout(timeoutId);
  }, [visibleLines, animate, lines]);

  return (
    <div
      className={cn(
        "w-full overflow-hidden bg-[#FAFAFA] border-2 border-[#0000EE] font-mono text-[13px] md:text-sm leading-relaxed text-black shadow-sm",
        className,
      )}
    >
      {/* Blue Header Bar */}
      <div className="bg-[#FAFAFA] px-2 py-2">
        <div className="bg-[#0000EE] text-white px-3 py-1 font-bold inline-block rounded-sm text-xs md:text-sm tracking-wide">
          * Welcome to {title} *
        </div>
      </div>

      {/* Border separating header from content */}
      <div className="border-t-2 border-[#0000EE] w-full" />

      {/* Terminal Content */}
      <div className="p-4 md:p-6 min-h-[280px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className={cn(
              "mb-4 last:mb-0 flex items-start",
              line.isCommand ? "gap-2" : "gap-0",
            )}
          >
            {line.isCommand && (
              <span className="text-black font-bold shrink-0 select-none">
                &gt;
              </span>
            )}
            <span
              className={cn(
                "break-all",
                line.color || (line.isCommand ? "text-black" : "text-black/90"),
              )}
            >
              {line.text}
            </span>
          </div>
        ))}

        {/* Currently typing line */}
        {visibleLines < lines.length && lines[visibleLines].isCommand && (
          <div className="mb-4 last:mb-0 flex items-start gap-2">
            <span className="text-black font-bold shrink-0 select-none">
              &gt;
            </span>
            <span className="text-black">
              {currentLineText}
              <span className="inline-block w-2.5 h-[1em] ml-1 bg-black animate-pulse align-middle" />
            </span>
          </div>
        )}

        {/* Blinking block cursor when finished */}
        {visibleLines >= lines.length && (
          <div className="flex items-start gap-2 mt-6 border-l-4 border-[#0000EE] pl-3 py-1 bg-white">
            <span className="text-black font-bold shrink-0 select-none">
              &gt;
            </span>
            <span className="inline-block w-2.5 h-[1em] bg-black animate-pulse align-middle" />
            <span className="text-black/50 ml-2">
              commands, ! bash, ↑/↓ history
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
