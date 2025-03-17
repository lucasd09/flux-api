import { eq } from "drizzle-orm";
import { labelsTable } from "../../database/schemas/tasks/labels.schema";
import { db } from "../../database";
import { CreateLabelDto, UpdateLabelDto, Label } from "../models/label.model";

export class LabelRepository {
  async findAll(): Promise<Label[]> {
    return await db.query.labelsTable.findMany();
  }

  async findById(id: string): Promise<Label> {
    const result = await db.query.labelsTable.findFirst({
      where: (fields) => eq(fields.id, id),
    });

    return (result as Label) || null;
  }

  async create(data: CreateLabelDto): Promise<Label> {
    const result = await db.insert(labelsTable).values(data).returning();
    return result[0];
  }

  async update(id: string, data: UpdateLabelDto): Promise<Label> {
    const result = await db
      .update(labelsTable)
      .set(data)
      .where(eq(labelsTable.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<Label> {
    const result = await db
      .delete(labelsTable)
      .where(eq(labelsTable.id, id))
      .returning();
    return result[0];
  }
}
