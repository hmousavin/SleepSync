import { Outlet } from "react-router-dom";  // Import Outlet
import { ThemeProvider } from "../providers/theme-provider";
import { ThemeToggle } from   "../components/theme-toggle";
import { MobileFrame } from "../components/mobile-frame";
import { BottomNav } from "../components/layout/bottom-nav";

export default function RootLayout() {
  return (
    <div className="font-sans">
      <ThemeProvider>
        <MobileFrame>
          <Outlet />
          <BottomNav />
        </MobileFrame>
        <ThemeToggle />
      </ThemeProvider>
    </div>
  );
}
