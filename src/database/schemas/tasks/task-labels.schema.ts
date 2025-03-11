import { relations } from "drizzle-orm";
import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { tasksTable } from "./tasks.schema";
import { labelsTable } from "./labels.schema";

export const taskLabelsTable = pgTable(
	"task_labels",
	{
		taskId: uuid("task_id")
			.notNull()
			.references(() => tasksTable.id, { onDelete: "cascade" }),
		labelId: uuid("label_id")
			.notNull()
			.references(() => labelsTable.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at").defaultNow(),
	},
	(table) => [primaryKey({ columns: [table.taskId, table.labelId] })],
);

export const taskLabelsRelations = relations(taskLabelsTable, ({ one }) => ({
	task: one(tasksTable, {
		fields: [taskLabelsTable.taskId],
		references: [tasksTable.id],
	}),
	label: one(labelsTable, {
		fields: [taskLabelsTable.labelId],
		references: [labelsTable.id],
	}),
}));
