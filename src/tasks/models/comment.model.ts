import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { commentsTable } from "../../database/schemas";
import { z } from "zod";

export type Comment = InferSelectModel<typeof commentsTable>;
export type CreateCommentDto = InferInsertModel<typeof commentsTable>;
export type UpdateCommentDto = Partial<
  Omit<CreateCommentDto, "id" | "taskId" | "userId">
>;

export const createCommentSchema = z.object({
  content: z.string().min(1).max(1000),
  taskId: z.string().uuid(),
  userId: z.string().uuid(),
  parentCommentId: z.string().uuid().optional(),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1).max(1000).optional(),
});
