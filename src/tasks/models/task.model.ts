import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { tasksTable } from "../../database/schemas/tasks/tasks.schema";
import { z } from "zod";

export type Task = InferSelectModel<typeof tasksTable>;
export type CreateTaskDto = InferInsertModel<typeof tasksTable>;
export type UpdateTaskDto = Omit<Partial<CreateTaskDto>, "id" | "creatorId">;

export const createTaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  projectId: z.string().uuid(),
  statusId: z.string().uuid(),
  priorityId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  creatorId: z.string().uuid(),
  dueDate: z.string().datetime().optional(),
  estimatedHours: z.number().int().positive().optional(),
  parentTaskId: z.string().uuid().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().optional(),
  statusId: z.string().uuid().optional(),
  priorityId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
  estimatedHours: z.number().int().positive().optional(),
  completedAt: z.string().datetime().optional(),
});
