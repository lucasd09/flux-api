import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { companiesTable } from "../../database/schemas/core/companies.schema";
import { z } from "zod";

export type Company = InferSelectModel<typeof companiesTable>;

export type CreateCompanyDto = InferInsertModel<typeof companiesTable>;

export type UpdateCompanyDto = Omit<Partial<CreateCompanyDto>, "id">;

export const createCompanySchema = z.object({
  name: z.string().min(2).max(255),
  logo: z.string().max(255).optional(),
  active: z.boolean().optional(),
});

export const updateCompanySchema = z.object({
  name: z.string().min(2).max(255).optional(),
  logo: z.string().max(255).optional(),
  active: z.boolean().optional(),
});
