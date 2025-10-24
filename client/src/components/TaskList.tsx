import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyState";
import type { Task } from "@shared/schema";
import { isToday, isTomorrow, isBefore, startOfDay } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggleComplete, onDelete }: TaskListProps) {
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const todayTasks = activeTasks.filter(
    (task) => task.dueDate && isToday(new Date(task.dueDate))
  );
  const tomorrowTasks = activeTasks.filter(
    (task) => task.dueDate && isTomorrow(new Date(task.dueDate))
  );
  const overdueTasks = activeTasks.filter(
    (task) => task.dueDate && isBefore(new Date(task.dueDate), startOfDay(new Date()))
  );
  const upcomingTasks = activeTasks.filter(
    (task) =>
      task.dueDate &&
      !isToday(new Date(task.dueDate)) &&
      !isTomorrow(new Date(task.dueDate)) &&
      !isBefore(new Date(task.dueDate), startOfDay(new Date()))
  );
  const somedayTasks = activeTasks.filter((task) => !task.dueDate);

  if (tasks.length === 0) {
    return <EmptyState type="no-tasks" />;
  }

  return (
    <div className="space-y-6 pb-32">
      {overdueTasks.length > 0 && (
        <div>
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 px-4 -mx-4 mb-3 z-10">
            <h2 className="text-sm font-medium text-destructive">Overdue</h2>
          </div>
          <div className="space-y-2">
            {overdueTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {todayTasks.length > 0 && (
        <div>
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 px-4 -mx-4 mb-3 z-10">
            <h2 className="text-sm font-medium text-foreground">Today</h2>
          </div>
          <div className="space-y-2">
            {todayTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {tomorrowTasks.length > 0 && (
        <div>
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 px-4 -mx-4 mb-3 z-10">
            <h2 className="text-sm font-medium text-foreground">Tomorrow</h2>
          </div>
          <div className="space-y-2">
            {tomorrowTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {upcomingTasks.length > 0 && (
        <div>
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 px-4 -mx-4 mb-3 z-10">
            <h2 className="text-sm font-medium text-foreground">Upcoming</h2>
          </div>
          <div className="space-y-2">
            {upcomingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {somedayTasks.length > 0 && (
        <div>
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 px-4 -mx-4 mb-3 z-10">
            <h2 className="text-sm font-medium text-muted-foreground">Someday</h2>
          </div>
          <div className="space-y-2">
            {somedayTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm py-2 px-4 -mx-4 mb-3 z-10">
            <h2 className="text-sm font-medium text-muted-foreground">Completed</h2>
          </div>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
