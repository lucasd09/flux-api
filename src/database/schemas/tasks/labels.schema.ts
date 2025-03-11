import { relations } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { companiesTable } from "../core/companies.schema";
import { taskLabelsTable } from "./task-labels.schema";
import { createdAt, id, updatedAt } from "../utils";

export const labelsTable = pgTable("labels", {
	id: id(),
	name: varchar("name", { length: 100 }).notNull(),
	color: varchar("color", { length: 50 }),
	companyId: uuid("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const labelsRelations = relations(labelsTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [labelsTable.companyId],
		references: [companiesTable.id],
	}),
	taskLabels: many(taskLabelsTable),
}));
