"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

const darkTheme = {
  dark: ["#1A1A2E", "#004D5A", "#007A8A", "#00B8CC", "#00E5FF"],
};

const lightTheme = {
  light: ["#F0F0F5", "#B2E6EC", "#66CCDA", "#33B3C8", "#0095A8"],
};

export function GitHubContributions() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username="ishanperera"
        colorScheme={isLight ? "light" : "dark"}
        theme={isLight ? lightTheme : darkTheme}
        fontSize={12}
        blockSize={12}
        blockMargin={4}
      />
    </div>
  );
}
