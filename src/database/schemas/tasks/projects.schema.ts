import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../utils";
import { relations } from "drizzle-orm";
import { teamProjectsTable } from "./team-projects.schema";
import { tasksTable } from "./tasks.schema";
import { companiesTable } from "../core/companies.schema";

export const projectsTable = pgTable("projects", {
	id: id(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	companyId: uuid("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	startDate: timestamp("start_date"),
	endDate: timestamp("end_date"),
	status: varchar("status", { length: 50 }).default("active"),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const projectsRelations = relations(projectsTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [projectsTable.companyId],
		references: [companiesTable.id],
	}),
	teamProjects: many(teamProjectsTable),
	tasks: many(tasksTable),
}));
