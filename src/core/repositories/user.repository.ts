import { and, eq } from "drizzle-orm";
import { db } from "../../database";
import { userRolesTable, usersTable } from "../../database/schemas";
import {
  CreateUserDto,
  ReadUserDto,
  UpdateUserDto,
} from "../models/user.model";

export class UserRepository {
  async findAll(): Promise<ReadUserDto[]> {
    return await db.query.usersTable.findMany();
  }

  async findById(id: string): Promise<ReadUserDto | null> {
    const result = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    return result || null;
  }

  async findByEmail(email: string): Promise<ReadUserDto | null> {
    const result = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return result || null;
  }

  async create(data: CreateUserDto): Promise<ReadUserDto> {
    const result = await db.insert(usersTable).values(data).returning();
    return result[0];
  }

  async update(id: string, data: UpdateUserDto): Promise<ReadUserDto> {
    const result = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();

    return result[0];
  }

  async delete(id: string): Promise<ReadUserDto> {
    const [result] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return result;
  }

  async activate(id: string): Promise<ReadUserDto> {
    return this.update(id, { active: true });
  }

  async deactivate(id: string): Promise<ReadUserDto> {
    return this.update(id, { active: false });
  }

  async getRoles(id: string) {
    const roles = await db.query.rolesTable.findMany({
      with: { userRoles: { where: (fields, { eq }) => eq(fields.userId, id) } },
    });

    return roles || null;
  }

  async assignRole(userId: string, roleId: string) {
    const [result] = await db
      .insert(userRolesTable)
      .values({ userId, roleId })
      .returning();

    return result;
  }

  async removeRole(userId: string, roleId: string) {
    const [result] = await db
      .delete(userRolesTable)
      .where(
        and(
          eq(userRolesTable.userId, userId),
          eq(userRolesTable.roleId, roleId),
        ),
      )
      .returning();

    return result;
  }
}
