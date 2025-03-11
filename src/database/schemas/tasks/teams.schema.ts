import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../utils";
import { relations } from "drizzle-orm";
import { teamProjectsTable } from "./team-projects.schema";
import { teamMembersTable } from "./team-members.schema";
import { companiesTable } from "../core/companies.schema";

export const teamsTable = pgTable("teams", {
	id: id(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description"),
	companyId: uuid("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const teamsRelations = relations(teamsTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [teamsTable.companyId],
		references: [companiesTable.id],
	}),
	members: many(teamMembersTable),
	projects: many(teamProjectsTable),
}));
