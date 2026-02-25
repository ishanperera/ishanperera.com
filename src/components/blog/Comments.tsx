"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo="ishanperera/ishanperera.com"
      repoId="R_kgDORYD9Yw"
      category="General"
      categoryId="DIC_kwDORYD9Y84C3JKs"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "light" ? "light" : "dark_dimmed"}
      lang="en"
      loading="lazy"
    />
  );
}
