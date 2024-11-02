"use client";

import { ThemeProvider } from "next-themes";

export function Appearance({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
