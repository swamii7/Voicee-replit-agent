import { Link, useLocation } from "wouter";
import { CheckSquare, Calendar, Settings } from "lucide-react";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: CheckSquare, label: "Tasks" },
    { path: "/calendar", icon: Calendar, label: "Calendar" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-card-border z-40"
      style={{ paddingBottom: "var(--sab, 0px)" }}
    >
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location === path;
          return (
            <Link key={path} href={path}>
              <button
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover-elevate"
                }`}
                data-testid={`nav-${label.toLowerCase()}`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs font-medium">{label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
