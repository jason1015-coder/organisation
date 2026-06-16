"use client";

import { useEffect, useMemo, useState } from "react";
import { defaultTheme, type Theme, type ThemePreset, themes } from "@/types/ui";

interface NanocoderTerminalProps {
  onThemeChange?: (theme: Theme) => void;
  version?: string;
  themeMode?: "dark" | "light" | "mixed";
  variant?: "default" | "brutalist";
}

const darkThemeKeys: ThemePreset[] = [
  "tokyo-night",
  "synthwave-84",
  "forest-night",
  "sunset-glow",
  "deep-sea",
];

const lightThemeKeys: ThemePreset[] = [
  "github-light",
  "catppuccin-latte",
  "solarized-light",
  "rose-pine-dawn",
  "one-light",
];

export default function NanocoderTerminal({
  onThemeChange,
  version = "1.0.0",
  themeMode = "dark",
  variant = "default",
}: NanocoderTerminalProps) {
  const activeThemeKeys = useMemo(() => {
    if (themeMode === "light") return lightThemeKeys;
    if (themeMode === "mixed") return [...darkThemeKeys, ...lightThemeKeys];
    return darkThemeKeys;
  }, [themeMode]);
  const commands = useMemo(
    () => [
      "Build a RESTful API with authentication",
      "Create a React component with TypeScript",
      "Add unit tests for user service",
      "Refactor database queries for performance",
      "Implement a WebSocket chat feature",
      "Set up CI/CD pipeline with GitHub Actions",
      "Optimize image loading performance",
      "Add dark mode support to application",
      "Create a responsive navbar component",
      "Implement infinite scroll for feed",
      "Add error boundary to catch React errors",
      "Write documentation for API endpoints",
      "Set up PostgreSQL database with Docker",
      "Create a custom React hook for state management",
      "Add TypeScript interfaces for API responses",
      "Implement user authentication with JWT tokens",
      "Build a reusable button component library",
      "Add lazy loading for React components",
      "Create a GraphQL server with Apollo",
      "Set up unit testing with Jest and React Testing Library",
      "Implement search functionality with debouncing",
      "Add form validation with Zod",
      "Create a dashboard layout with sidebar navigation",
      "Implement real-time notifications with WebSockets",
      "Add internationalization (i18n) support",
      "Create a data fetching hook with React Query",
      "Implement file upload with progress indicator",
      "Add caching layer for API responses",
      "Create a modal component with backdrop blur",
      "Set up logging with Winston and Morgan",
      "Implement rate limiting for API endpoints",
      "Add accessibility (a11y) attributes to components",
      "Create a pagination component for data tables",
      "Implement theme switching with localStorage persistence",
      "Add skeleton loading screens for better UX",
      "Create a toast notification system",
      "Set up end-to-end testing with Playwright",
      "Implement password strength validation",
      "Add CSV export functionality for data tables",
      "Create a multi-step form wizard",
      "Implement search suggestions with autocomplete",
      "Add keyboard shortcuts for better accessibility",
      "Create a context provider for app state",
      "Set up monitoring with Sentry",
      "Implement optimistic UI updates",
      "Add drag-and-drop file upload zone",
      "Create a responsive grid layout system",
      "Implement deep linking for shareable URLs",
      "Add session timeout with inactivity detection",
      "Create a date picker component",
      "Implement virtual scrolling for large lists",
      "Add unit test coverage reporting",
      "Create a tooltip component with positioning",
      "Set up API versioning strategy",
      "Implement request cancellation with AbortController",
      "Add dark mode with system preference detection",
      "Create a table component with sorting",
      "Implement concurrent mode for better performance",
      "Add client-side search with Fuse.js",
      "Create a progress stepper for multi-step flows",
      "Implement debounced search for API calls",
      "Add audio notifications for events",
      "Create a color picker component",
      "Set up database migrations",
      "Implement role-based access control (RBAC)",
      "Add skeleton screens for content loading",
      "Create a tag input component",
      "Implement offline support with service workers",
      "Add analytics tracking for user events",
      "Create a carousel/slider component",
      "Set up error handling middleware",
      "Implement request retry logic with exponential backoff",
      "Add clipboard copy functionality",
      "Create a chart component with recharts",
      "Implement data validation with Yup",
      "Add responsive images with next/image",
      "Create a dropdown menu component",
      "Set up WebSocket connection management",
      "Implement text-to-speech for accessibility",
    ],
    [],
  );

  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(themes[activeThemeKeys[0]]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Randomize command index only on client after hydration
  useEffect(() => {
    setIsMounted(true);
    const randomIndex = Math.floor(Math.random() * commands.length);
    setCurrentCommandIndex(randomIndex);
  }, [commands.length]);

  // Cycle through themes slowly to reduce flashing
  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setCurrentThemeIndex((prev) => (prev + 1) % activeThemeKeys.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMounted, activeThemeKeys.length]);

  // Update current theme when index changes
  useEffect(() => {
    const newTheme = themes[activeThemeKeys[currentThemeIndex]];
    setCurrentTheme(newTheme);
    onThemeChange?.(newTheme);
  }, [currentThemeIndex, onThemeChange, activeThemeKeys]);

  useEffect(() => {
    // Only run typing animation after client-side mount
    if (!isMounted) return;

    const currentCommand = commands[currentCommandIndex];

    if (isTyping) {
      if (displayedText.length < currentCommand.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentCommand.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        let newIndex: number;
        do {
          newIndex = Math.floor(Math.random() * commands.length);
        } while (newIndex === currentCommandIndex && commands.length > 1);
        setCurrentCommandIndex(newIndex);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentCommandIndex, commands, isMounted]);

  const colors = currentTheme.colors;
  const themeGradient = colors.gradientColors
    ? `linear-gradient(to right, ${colors.gradientColors.join(", ")})`
    : `linear-gradient(to right, ${colors.primary}, ${colors.tool})`;

  const isBrutalist = variant === "brutalist";

  return (
    <div className="transition-all duration-700 ease-in-out">
      <div
        className={`overflow-hidden border ${
          isBrutalist ? "rounded-none shadow-none" : "rounded-lg shadow-2xl"
        }`}
        style={{
          backgroundColor:
            currentTheme.themeType === "light" ? "#ffffff" : "#000000",
          borderColor: isBrutalist ? "#000000" : `${colors.tool}4d`, // 30% opacity
        }}
      >
        {/* Terminal Window Controls */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{
            backgroundColor:
              currentTheme.themeType === "light" ? "#ffffff" : "#000000",
            borderColor: isBrutalist ? "#000000" : `${colors.tool}33`, // 20% opacity
          }}
        >
          <div className={`w-3 h-3 bg-red-500 ${isBrutalist ? "rounded-none" : "rounded-full"}`} />
          <div className={`w-3 h-3 bg-yellow-500 ${isBrutalist ? "rounded-none" : "rounded-full"}`} />
          <div className={`w-3 h-3 bg-green-500 ${isBrutalist ? "rounded-none" : "rounded-full"}`} />
        </div>

        {/* Terminal Content */}
        <div className="p-4 sm:p-6 font-mono text-[10px] sm:text-sm overflow-x-auto w-full">
          {/* cfonts-style ASCII Header */}
          <div className="mb-8 sm:mb-12 text-[10px] sm:text-sm leading-none sm:leading-tight font-bold select-none whitespace-pre">
            <div
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: themeGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <div>█▄ █ ▄▀█ █▄ █ █▀█ █▀▀ █▀█ █▀▄ █▀▀ █▀█</div>
              <div>█ ▀█ █▀█ █ ▀█ █▄█ █▄▄ █▄█ █▄▀ ██▄ █▀▄</div>
            </div>
          </div>

          {/* Tips Section with Welcome Banner */}
          <div
            className="inline-block px-2 py-1 mb-2 font-bold"
            style={{
              backgroundColor: colors.primary,
              color: colors.base,
            }}
          >
            ✱ Welcome to Nanocoder {version} ✱
          </div>
          <div
            className="rounded-md p-3 sm:p-4 pt-4 sm:pt-5 mb-4 sm:mb-6 relative"
            style={{
              borderColor: colors.primary,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <div style={{ color: colors.text }} className="mb-4">
              Tips for getting started:
            </div>
            <div className="space-y-1" style={{ color: colors.secondary }}>
              <div>
                1. Use natural language to describe what you want to build.
              </div>
              <div>
                2. Ask for file analysis, editing, bash commands and more.
              </div>
              <div>
                3. Be specific as you would with another engineer for best
                results.
              </div>
              <div>4. Type /exit or press Ctrl+C to quit.</div>
            </div>
            <div className="my-4" style={{ color: colors.text }}>
              /help for help
            </div>
          </div>

          {/* Status Line */}
          <div
            className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 sm:mb-6 pt-2 sm:pt-3"
            style={{ borderColor: `${colors.secondary}33` }}
          >
            <span style={{ color: colors.info, fontWeight: "bold" }}>
              Ollama
            </span>
            <span style={{ color: colors.secondary }}>·</span>
            <span style={{ color: colors.tool }}>gemma4:12b</span>
            <span style={{ color: colors.secondary }}>·</span>
            <span style={{ color: colors.secondary }}>
              ~/Library/Preferences/nanocoder/agents.config.json
            </span>
            <span style={{ color: colors.secondary }}>·</span>
            <span style={{ color: colors.error }}>
              ⎇ main <span style={{ color: colors.secondary }}>(default)</span>
            </span>
          </div>

          {/* Prompt Section */}
          <div
            className="mb-2"
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            What would you like me to help with?
          </div>
          <div
            className="space-y-1 p-2 sm:p-3"
            style={{
              backgroundColor: colors.base,
              borderLeft: `2px solid ${colors.primary}`,
            }}
          >
            <div style={{ color: colors.text }}>
              <span style={{ color: colors.text }}>
                {displayedText}
                <span style={{ color: colors.text }}>█</span>
              </span>
            </div>
          </div>
          <div
            className="flex items-center gap-2 mt-2 sm:mt-3"
            style={{ color: colors.secondary }}
          >
            <span>▶</span> normal mode on{" "}
            <span className="opacity-60">· ctx: ~1%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
