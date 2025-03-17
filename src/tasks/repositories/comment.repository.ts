import { db } from "../../database";
import { commentsTable } from "../../database/schemas";
import { eq } from "drizzle-orm";
import { CreateCommentDto, UpdateCommentDto } from "../models/comment.model";

export class CommentRepository {
  async findAllByTask(taskId: string) {
    return db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.taskId, taskId));
  }

  async findById(id: string) {
    return db
      .select()
      .from(commentsTable)
      .where(eq(commentsTable.id, id))
      .limit(1);
  }

  async create(data: CreateCommentDto) {
    return db.insert(commentsTable).values(data).returning();
  }

  async update(id: string, data: UpdateCommentDto) {
    return db
      .update(commentsTable)
      .set(data)
      .where(eq(commentsTable.id, id))
      .returning();
  }

  async delete(id: string) {
    return db.delete(commentsTable).where(eq(commentsTable.id, id)).returning();
  }
}
