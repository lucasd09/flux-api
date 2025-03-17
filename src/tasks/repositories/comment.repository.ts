import { db } from "../../database";
import { commentsTable } from "../../database/schemas";
import { eq } from "drizzle-orm";
import {
  Comment,
  CreateCommentDto,
  UpdateCommentDto,
} from "../models/comment.model";

export class CommentRepository {
  async findAllByTask(taskId: string): Promise<Comment[]> {
    return await db.query.commentsTable.findMany({
      where: (fields) => eq(fields.taskId, taskId),
    });
  }

  async findById(id: string): Promise<Comment> {
    const result = await db.query.commentsTable.findFirst({
      where: (fields) => eq(fields.id, id),
    });

    return (result as Comment) || null;
  }

  async create(data: CreateCommentDto): Promise<Comment> {
    return await db.insert(commentsTable).values(data).returning();
  }

  async update(id: string, data: UpdateCommentDto): Promise<Comment> {
    return await db
      .update(commentsTable)
      .set(data)
      .where(eq(commentsTable.id, id))
      .returning();
  }

  async delete(id: string): Promise<Comment> {
    return await db
      .delete(commentsTable)
      .where(eq(commentsTable.id, id))
      .returning();
  }
}
