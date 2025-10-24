import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Task } from "@shared/schema";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";

interface CalendarViewProps {
  tasks: Task[];
}

export function CalendarView({ tasks }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const tasksForDay = tasks.filter(
        (task) => task.dueDate && isSameDay(new Date(task.dueDate), cloneDay)
      );

      days.push(
        <button
          key={day.toString()}
          className={`aspect-square p-2 rounded-lg hover-elevate transition-all relative ${
            !isSameMonth(day, monthStart)
              ? "text-muted-foreground"
              : isToday(day)
              ? "bg-primary text-primary-foreground font-semibold"
              : selectedDate && isSameDay(day, selectedDate)
              ? "bg-accent"
              : ""
          }`}
          onClick={() => setSelectedDate(cloneDay)}
          data-testid={`calendar-day-${format(cloneDay, "yyyy-MM-dd")}`}
        >
          <span className="text-sm">{formattedDate}</span>
          {tasksForDay.length > 0 && (
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
              {tasksForDay.slice(0, 3).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-current" />
              ))}
            </div>
          )}
        </button>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );
    days = [];
  }

  const selectedDayTasks = selectedDate
    ? tasks.filter((task) => task.dueDate && isSameDay(new Date(task.dueDate), selectedDate))
    : [];

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              data-testid="button-prev-month"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              data-testid="button-next-month"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        {rows}
      </Card>

      {selectedDate && (
        <Card className="p-4">
          <h3 className="text-base font-semibold mb-3">
            {format(selectedDate, "EEEE, MMMM d")}
          </h3>
          {selectedDayTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No tasks for this day</p>
          ) : (
            <div className="space-y-2">
              {selectedDayTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-2 p-2 rounded-lg bg-accent/50">
                  <div className={`w-1 h-full rounded-full ${
                    task.priority === "high"
                      ? "bg-destructive"
                      : task.priority === "medium"
                      ? "bg-chart-4"
                      : "bg-chart-3"
                  }`} />
                  <div>
                    <p className="text-sm font-medium" data-testid={`calendar-task-${task.id}`}>{task.title}</p>
                    {task.dueTime && (
                      <p className="text-xs text-muted-foreground">{task.dueTime}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
