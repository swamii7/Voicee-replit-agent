import { Mic, CheckCircle2, Calendar } from "lucide-react";

interface EmptyStateProps {
  type: "no-tasks" | "no-tasks-today" | "no-calendar-events";
}

export function EmptyState({ type }: EmptyStateProps) {
  const config = {
    "no-tasks": {
      icon: Mic,
      title: "No tasks yet",
      description: "Tap the microphone button below to add your first task using your voice",
    },
    "no-tasks-today": {
      icon: CheckCircle2,
      title: "All clear for today",
      description: "You have no tasks scheduled for today. Enjoy your free time!",
    },
    "no-calendar-events": {
      icon: Calendar,
      title: "No events",
      description: "Your calendar is clear for this period",
    },
  };

  const { icon: Icon, title, description } = config[type];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4" data-testid={`empty-state-${type}`}>
      <div className="w-24 h-24 rounded-full bg-accent/50 flex items-center justify-center mb-4">
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">{description}</p>
    </div>
  );
}
