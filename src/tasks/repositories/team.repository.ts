import { eq } from "drizzle-orm";
import { teamsTable } from "../../database/schemas/tasks/teams.schema";
import { db } from "../../database";
import { CreateTeamDto, UpdateTeamDto, Team } from "../models/team.model";

export class TeamRepository {
  async findAll(): Promise<Team[]> {
    return await db.query.teamsTable.findMany();
  }

  async findById(id: string): Promise<Team> {
    const result = await db.query.teamsTable.findFirst({
      where: (fields) => eq(fields.id, id),
    });
    return (result as Team) || null;
  }

  async create(data: CreateTeamDto): Promise<Team> {
    const result = await db.insert(teamsTable).values(data).returning();
    return result[0];
  }

  async update(id: string, data: UpdateTeamDto): Promise<Team> {
    const result = await db
      .update(teamsTable)
      .set(data)
      .where(eq(teamsTable.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<Team> {
    const result = await db
      .delete(teamsTable)
      .where(eq(teamsTable.id, id))
      .returning();
    return result[0];
  }
}
