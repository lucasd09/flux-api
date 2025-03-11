import { relations } from "drizzle-orm";
import {
	pgTable,
	varchar,
	text,
	integer,
	boolean,
	uuid,
} from "drizzle-orm/pg-core";
import { tasksTable } from "./tasks.schema";
import { createdAt, id, updatedAt } from "../utils";
import { companiesTable } from "../core/companies.schema";

export const taskStatusesTable = pgTable("task_statuses", {
	id: id(),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description"),
	color: varchar("color", { length: 50 }),
	companyId: uuid("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	orderIndex: integer("order_index").default(0),
	isDefault: boolean("is_default").default(false),
	updatedAt: createdAt(),
	createdAt: updatedAt(),
});

export const taskStatusesRelations = relations(
	taskStatusesTable,
	({ one, many }) => ({
		company: one(companiesTable, {
			fields: [taskStatusesTable.companyId],
			references: [companiesTable.id],
		}),
		tasks: many(tasksTable),
	}),
);
