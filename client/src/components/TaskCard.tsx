import { useState } from "react";
import { Check, Trash2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Task } from "@shared/schema";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeAction, setSwipeAction] = useState<"complete" | "delete" | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    const swipeDistance = touchStart - e.targetTouches[0].clientX;
    if (swipeDistance > 50) {
      setSwipeAction("delete");
    } else if (swipeDistance < -50) {
      setSwipeAction("complete");
    } else {
      setSwipeAction(null);
    }
  };

  const handleTouchEnd = () => {
    if (swipeAction === "complete" && !task.completed) {
      onToggleComplete(task.id);
    } else if (swipeAction === "delete") {
      onDelete(task.id);
    }
    setSwipeAction(null);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive";
      case "medium":
        return "bg-chart-4";
      case "low":
        return "bg-chart-3";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="relative">
      <Card
        className={`p-4 hover-elevate transition-all ${task.completed ? "opacity-60" : ""}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-testid={`card-task-${task.id}`}
      >
        <div className="flex gap-3">
          <div className={`w-1 self-stretch rounded-full ${getPriorityColor(task.priority)}`} />
          <Button
            size="icon"
            variant="ghost"
            className="flex-shrink-0 w-6 h-6 rounded-md"
            onClick={() => onToggleComplete(task.id)}
            data-testid={`button-toggle-${task.id}`}
          >
            {task.completed ? (
              <div className="w-5 h-5 rounded-md bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground" />
            )}
          </Button>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-base leading-relaxed ${task.completed ? "line-through text-muted-foreground" : ""}`}
              data-testid={`text-task-title-${task.id}`}
            >
              {task.title}
            </h3>
            {task.notes && (
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed" data-testid={`text-task-notes-${task.id}`}>
                {task.notes}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              {task.dueDate && (
                <span className="text-xs text-muted-foreground bg-accent px-3 py-1 rounded-full" data-testid={`text-task-due-${task.id}`}>
                  {format(new Date(task.dueDate), "MMM d")}
                  {task.dueTime && ` at ${task.dueTime}`}
                </span>
              )}
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="flex-shrink-0"
            onClick={() => onDelete(task.id)}
            data-testid={`button-delete-${task.id}`}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
