import { relations } from "drizzle-orm";
import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../utils";
import { usersTable } from "../core/users.schema";
import { tasksTable } from "./tasks.schema";

export const commentsTable = pgTable("comments", {
	id: id(),
	content: text("content").notNull(),
	taskId: uuid("task_id")
		.notNull()
		.references(() => tasksTable.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	parentCommentId: uuid("parent_comment_id").references(
		() => commentsTable.id,
		{
			onDelete: "set null",
		},
	),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
	task: one(tasksTable, {
		fields: [commentsTable.taskId],
		references: [tasksTable.id],
	}),
	user: one(usersTable, {
		fields: [commentsTable.userId],
		references: [usersTable.id],
	}),
	parentComment: one(commentsTable, {
		fields: [commentsTable.parentCommentId],
		references: [commentsTable.id],
		relationName: "parentComment",
	}),
	replies: many(commentsTable, {
		relationName: "parentComment",
	}),
}));
