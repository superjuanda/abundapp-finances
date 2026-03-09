import { PlusCircle, List, BarChart3, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabId = "register" | "history" | "summary" | "coming-soon";

const tabs: { id: TabId; label: string; icon: React.ComponentType<any> }[] = [
  { id: "register", label: "Registrar", icon: PlusCircle },
  { id: "history", label: "Historial", icon: List },
  { id: "summary", label: "Resumen", icon: BarChart3 },
  { id: "coming-soon", label: "Próximo", icon: Rocket },
];

interface BottomNavProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-4 touch-target transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  "transition-transform duration-200",
                  isActive && "scale-110"
                )}
              />
              <span className={cn(
                "text-[11px] mt-0.5 font-semibold transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
