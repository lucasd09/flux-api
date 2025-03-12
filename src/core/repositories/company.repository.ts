import { eq } from "drizzle-orm";
import { companiesTable } from "../../database/schemas/core/companies.schema";
import { db } from "../../database";
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  Company,
} from "../models/company.model";
import { slugify } from "../../utils/helpers";

export class CompanyRepository {
  async findAll(includeInactive = false): Promise<Company[]> {
    const query = includeInactive
      ? db.select().from(companiesTable)
      : db.select().from(companiesTable).where(eq(companiesTable.active, true));

    return await query;
  }

  async findById(id: string): Promise<Company> {
    const result = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.id, id))
      .limit(1);

    return result[0] || null;
  }

  async findBySlug(slug: string): Promise<Company> {
    const result = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.slug, slug))
      .limit(1);

    return result[0] || null;
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    const slug = slugify(data.name);

    const result = await db
      .insert(companiesTable)
      .values({
        name: data.name,
        slug,
        logo: data.logo,
        active: data.active ?? true,
      })
      .returning();

    return result[0];
  }

  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    if (data.name) {
      data.slug = slugify(data.name);
    }

    const result = await db
      .update(companiesTable)
      .set(data)
      .where(eq(companiesTable.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<Company> {
    const result = await db
      .delete(companiesTable)
      .where(eq(companiesTable.id, id))
      .returning();

    return result[0];
  }

  async deactivate(id: string): Promise<Company> {
    return this.update(id, { active: false });
  }

  async activate(id: string): Promise<Company> {
    return this.update(id, { active: true });
  }
}
