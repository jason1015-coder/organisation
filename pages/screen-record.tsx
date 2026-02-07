import type { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import NanocoderTerminal from "@/components/NanocoderTerminal";
import { type Theme, themes } from "@/types/ui";

interface ScreenRecordProps {
  nanocoderVersion: string;
}

export default function ScreenRecord({ nanocoderVersion }: ScreenRecordProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    themes["tokyo-night"],
  );

  // Create a callback for theme changes
  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
  };

  const colors = currentTheme.colors;
  const themeGradient = colors.gradientColors
    ? `linear-gradient(to right, ${colors.gradientColors.join(", ")})`
    : `linear-gradient(to right, ${colors.primary}, ${colors.tool})`;

  return (
    <>
      <Head>
        <title>Nanocoder Terminal - Screen Recording</title>
        <meta
          name="description"
          content="Nanocoder terminal interface for screen recording demonstrations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className="min-h-screen flex items-center justify-center p-8 transition-colors duration-700 ease-in-out"
        style={{
          background: themeGradient,
        }}
      >
        <div className="w-full max-w-4xl">
          <NanocoderTerminal
            version={nanocoderVersion}
            onThemeChange={handleThemeChange}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<ScreenRecordProps> = async () => {
  // Fetch Nanocoder version from npm
  let nanocoderVersion = "1.0.0";
  try {
    const npmRes = await fetch(
      "https://registry.npmjs.org/@nanocollective/nanocoder/latest",
    );
    if (npmRes.ok) {
      const data = await npmRes.json();
      nanocoderVersion = data.version || "1.0.0";
    }
  } catch (error) {
    console.error("Error fetching nanocoder version:", error);
  }

  return {
    props: {
      nanocoderVersion,
    },
  };
};
