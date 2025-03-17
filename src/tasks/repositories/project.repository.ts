import { eq } from "drizzle-orm";
import { projectsTable } from "../../database/schemas/tasks/projects.schema";
import { db } from "../../database";
import {
  CreateProjectDto,
  UpdateProjectDto,
  Project,
} from "../models/project.model";

export class ProjectRepository {
  async findAll(): Promise<Project[]> {
    return await db.query.projectsTable.findMany();
  }

  async findById(id: string): Promise<Project> {
    const result = await db.query.projectsTable.findFirst({
      where: (fields) => eq(fields.id, id),
    });

    return (result as Project) || null;
  }

  async create(data: CreateProjectDto): Promise<Project> {
    const result = await db.insert(projectsTable).values(data).returning();
    return result[0];
  }

  async update(id: string, data: UpdateProjectDto): Promise<Project> {
    const result = await db
      .update(projectsTable)
      .set(data)
      .where(eq(projectsTable.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<Project> {
    const result = await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, id))
      .returning();
    return result[0];
  }
}
