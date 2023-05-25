"use client";

import { createTheme, NextUIProvider as NextUiPrv } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useServerInsertedHTML } from "next/navigation";
import { CssBaseline } from "@nextui-org/react";

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#4ADE7B",
      secondary: "#F9CB80",
      error: "#FCC5D8",
    },
  },
});

export default function NextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>;
  });
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUiPrv>{children}</NextUiPrv>
    </NextThemesProvider>
  );
}
