import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { tasksTable } from "./tasks.schema";
import { createdAt, id, updatedAt } from "../utils";
import { usersTable } from "../core/users.schema";

export const timeEntriesTable = pgTable("time_entries", {
	id: id(),
	taskId: uuid("task_id")
		.notNull()
		.references(() => tasksTable.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	description: text("description"),
	startTime: timestamp("start_time").notNull(),
	endTime: timestamp("end_time"),
	durationMinutes: integer("duration_minutes"),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const timeEntriesRelations = relations(timeEntriesTable, ({ one }) => ({
	task: one(tasksTable, {
		fields: [timeEntriesTable.taskId],
		references: [tasksTable.id],
	}),
	user: one(usersTable, {
		fields: [timeEntriesTable.userId],
		references: [usersTable.id],
	}),
}));
