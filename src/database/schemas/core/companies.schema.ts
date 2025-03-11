import { relations } from "drizzle-orm";
import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../utils";
import { projectsTable } from "../tasks/projects.schema";
import { teamsTable } from "../tasks/teams.schema";
import { rolesTable } from "./roles.schema";
import { usersTable } from "./users.schema";

export const companiesTable = pgTable("companies", {
	id: id(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull().unique(),
	logo: varchar("logo", { length: 255 }),
	active: boolean("active").default(true),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const companiesRelations = relations(companiesTable, ({ many }) => ({
	users: many(usersTable),
	teams: many(teamsTable),
	projects: many(projectsTable),
	roles: many(rolesTable),
}));
