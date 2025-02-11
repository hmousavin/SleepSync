import { useLocation, useNavigate } from "react-router-dom";
import { Home, Music, Book, BarChart, User } from "lucide-react";

const navItems = [
  { href: "/",        icon: Home,     label: "Home"    },
  { href: "/sounds",  icon: Music,    label: "Sounds"  },
  { href: "/journal", icon: Book,     label: "Journal" },
  { href: "/report",  icon: BarChart, label: "Report"  },
  { href: "/account", icon: User,     label: "Account" },
];

export function BottomNav() {
  const location = useLocation(); // Get current pathname
  const navigate = useNavigate(); // Navigate programmatically

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="flex justify-around">
        {navItems.map(({ href, icon: Icon, label }) => (
          <button
            key={href}
            onClick={() => navigate(href)}
            className={`flex flex-col items-center p-2 ${
              location.pathname === href ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}