import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { rolesTable } from "../../database/schemas";
import { z } from "zod";

export type Role = InferSelectModel<typeof rolesTable>;
export type CreateRoleDto = InferInsertModel<typeof rolesTable>;
export type UpdateRoleDto = Partial<Omit<CreateRoleDto, "id" | "companyId">>;

export const createRoleSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  companyId: z.string(),
  isSystem: z.boolean().optional(),
});

export const updateRoleSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().optional(),
  isSystem: z.boolean().optional(),
});
