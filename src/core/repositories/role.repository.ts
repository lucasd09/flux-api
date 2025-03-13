import { db } from "../../database";
import { rolesTable } from "../../database/schemas";
import { eq } from "drizzle-orm";
import { Role, CreateRoleDto, UpdateRoleDto } from "../models/role.model";

export class RoleRepository {
  async findAll(): Promise<Role[]> {
    return await db.select().from(rolesTable);
  }

  async findById(id: string): Promise<Role | null> {
    const result = await db
      .select()
      .from(rolesTable)
      .where(eq(rolesTable.id, id))
      .limit(1);
    return result[0] || null;
  }

  async create(data: CreateRoleDto): Promise<Role> {
    const result = await db.insert(rolesTable).values(data).returning();
    return result[0];
  }

  async update(id: string, data: UpdateRoleDto): Promise<Role> {
    const result = await db
      .update(rolesTable)
      .set(data)
      .where(eq(rolesTable.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<Role> {
    const result = await db
      .delete(rolesTable)
      .where(eq(rolesTable.id, id))
      .returning();
    return result[0];
  }
}
