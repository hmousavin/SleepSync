import React from "react";
import { ThemeProvider } from "../providers/theme-provider";
import { ThemeToggle } from   "../components/theme-toggle";
import { MobileFrame } from "../components/mobile-frame";
import { BottomNav } from "../components/layout/bottom-nav";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans"> {/* Apply font directly */}
      <ThemeProvider>
        <MobileFrame>
          {children}
          <BottomNav />
        </MobileFrame>
        <ThemeToggle />
      </ThemeProvider>
    </div>
  );
}
