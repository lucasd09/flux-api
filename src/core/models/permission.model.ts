import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { permissionsTable } from "../../database/schemas";
import { z } from "zod";

export type Permission = InferSelectModel<typeof permissionsTable>;
export type CreatePermissionDto = InferInsertModel<typeof permissionsTable>;
export type UpdatePermissionDto = Partial<CreatePermissionDto>;

export const createPermissionSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  module: z.string().min(2).max(100),
  action: z.string().min(2).max(100),
});

export const updatePermissionSchema = createPermissionSchema.partial();
