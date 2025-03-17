import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { labelsTable } from "../../database/schemas/tasks/labels.schema";
import { z } from "zod";

export type Label = InferSelectModel<typeof labelsTable>;

export type CreateLabelDto = InferInsertModel<typeof labelsTable>;

export type UpdateLabelDto = Omit<Partial<CreateLabelDto>, "id">;

export const createLabelSchema = z.object({
  name: z.string().min(2).max(100),
  color: z.string().max(50).optional(),
  companyId: z.string().uuid(),
});

export const updateLabelSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  color: z.string().max(50).optional(),
  companyId: z.string().uuid().optional(),
});
