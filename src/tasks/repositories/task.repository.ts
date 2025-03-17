import { eq } from "drizzle-orm";
import { tasksTable } from "../../database/schemas/tasks/tasks.schema";
import { db } from "../../database";
import { CreateTaskDto, UpdateTaskDto, Task } from "../models/task.model";

export class TaskRepository {
  async findAll(): Promise<Task[]> {
    return await db.query.tasksTable.findMany();
  }

  async findById(id: string): Promise<Task> {
    const result = await db.query.tasksTable.findFirst({
      where: (fields) => eq(fields.id, id),
    });

    return (result as Task) || null;
  }

  async create(data: CreateTaskDto): Promise<Task> {
    const result = await db.insert(tasksTable).values(data).returning();

    return result[0];
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    const [result] = await db
      .update(tasksTable)
      .set(data)
      .where(eq(tasksTable.id, id))
      .returning();

    return result as Task;
  }

  async delete(id: string): Promise<Task> {
    const result = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, id))
      .returning();

    return result[0];
  }
}
