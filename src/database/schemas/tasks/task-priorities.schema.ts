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

export const taskPrioritiesTable = pgTable("task_priorities", {
	id: id(),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description"),
	color: varchar("color", { length: 50 }),
	companyId: uuid("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	level: integer("level").notNull(),
	isDefault: boolean("is_default").default(false),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const taskPrioritiesRelations = relations(
	taskPrioritiesTable,
	({ one, many }) => ({
		company: one(companiesTable, {
			fields: [taskPrioritiesTable.companyId],
			references: [companiesTable.id],
		}),
		tasks: many(tasksTable),
	}),
);
