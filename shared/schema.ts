import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  notes: text("notes"),
  dueDate: timestamp("due_date"),
  dueTime: text("due_time"),
  priority: varchar("priority", { length: 10 }).notNull().default("medium"),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  completedAt: true,
  createdAt: true,
}).extend({
  title: z.string().min(1, "Task title is required"),
  notes: z.string().optional(),
  dueDate: z.union([
    z.string().transform((str) => new Date(str)).refine(
      (date) => !isNaN(date.getTime()),
      { message: "Invalid date string" }
    ),
    z.date(),
    z.null(),
  ]).optional().nullable(),
  dueTime: z.string().optional().nullable(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  completed: z.boolean().default(false),
});

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

// Voice command parsing result
export const voiceCommandSchema = z.object({
  title: z.string(),
  notes: z.string().optional(),
  dueDate: z.string().optional(),
  dueTime: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export type VoiceCommand = z.infer<typeof voiceCommandSchema>;
