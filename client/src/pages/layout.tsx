import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../providers/theme-provider";
import { ThemeToggle } from   "../components/theme-toggle";
import { MobileFrame } from "../components/mobile-frame";
import { BottomNav } from "../components/layout/bottom-nav";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <MobileFrame>
        <Outlet />
        <BottomNav />
      </MobileFrame>
      <ThemeToggle />
    </ThemeProvider>
  );
}