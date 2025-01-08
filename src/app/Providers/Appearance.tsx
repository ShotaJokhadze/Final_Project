"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface AppearanceProps {
  children: ReactNode;
}

export function Appearance({ children }: AppearanceProps): JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
