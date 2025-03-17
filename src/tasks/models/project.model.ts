import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { projectsTable } from "../../database/schemas/tasks/projects.schema";
import { z } from "zod";

export type Project = InferSelectModel<typeof projectsTable>;

export type CreateProjectDto = InferInsertModel<typeof projectsTable>;

export type UpdateProjectDto = Omit<Partial<CreateProjectDto>, "id">;

export const createProjectSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().optional(),
  companyId: z.string().uuid(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string().max(50).optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(2).max(255).optional(),
  description: z.string().optional(),
  companyId: z.string().uuid().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.string().max(50).optional(),
});
