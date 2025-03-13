import { eq } from "drizzle-orm";
import { db } from "../../database";
import { usersTable } from "../../database/schemas";
import {
  CreateUserDto,
  ReadUserDto,
  UpdateUserDto,
} from "../models/user.model";

export class UserRepository {
  async findAll(): Promise<ReadUserDto[]> {
    return await db.select().from(usersTable);
  }

  async findById(id: string): Promise<ReadUserDto | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    return result[0] || null;
  }

  async findByEmail(email: string): Promise<ReadUserDto | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return result[0] || null;
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
    const result = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    return result[0];
  }

  async activate(id: string): Promise<ReadUserDto> {
    return this.update(id, { active: true });
  }

  async deactivate(id: string): Promise<ReadUserDto> {
    return this.update(id, { active: false });
  }
}
