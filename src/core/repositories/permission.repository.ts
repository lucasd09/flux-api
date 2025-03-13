import { db } from "../../database";
import { permissionsTable } from "../../database/schemas";
import { eq } from "drizzle-orm";
import {
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto,
} from "../models/permission.model";

export class PermissionRepository {
  async findAll(): Promise<Permission[]> {
    return await db.select().from(permissionsTable);
  }

  async findById(id: string): Promise<Permission | null> {
    const result = await db
      .select()
      .from(permissionsTable)
      .where(eq(permissionsTable.id, id))
      .limit(1);
    return result[0] || null;
  }

  async findByName(name: string): Promise<Permission | null> {
    const result = await db
      .select()
      .from(permissionsTable)
      .where(eq(permissionsTable.name, name))
      .limit(1);
    return result[0] || null;
  }

  async create(data: CreatePermissionDto): Promise<Permission> {
    const result = await db.insert(permissionsTable).values(data).returning();
    return result[0];
  }

  async update(id: string, data: UpdatePermissionDto): Promise<Permission> {
    const result = await db
      .update(permissionsTable)
      .set(data)
      .where(eq(permissionsTable.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<Permission> {
    const result = await db
      .delete(permissionsTable)
      .where(eq(permissionsTable.id, id))
      .returning();
    return result[0];
  }
}
