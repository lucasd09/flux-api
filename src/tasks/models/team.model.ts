import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { teamsTable } from "../../database/schemas/tasks/teams.schema";
import { z } from "zod";

export type Team = InferSelectModel<typeof teamsTable>;

export type CreateTeamDto = InferInsertModel<typeof teamsTable>;

export type UpdateTeamDto = Omit<Partial<CreateTeamDto>, "id">;

export const createTeamSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().optional(),
  companyId: z.string().uuid(),
});

export const updateTeamSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  companyId: z.string().uuid().optional(),
});
