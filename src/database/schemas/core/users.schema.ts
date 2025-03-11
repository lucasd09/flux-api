import { relations } from "drizzle-orm";
import {
	boolean,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../utils";
import { companiesTable } from "./companies.schema";
import { userRolesTable } from "./user-roles.schema";
import { commentsTable } from "../tasks/comments.schema";
import { tasksTable } from "../tasks/tasks.schema";
import { teamMembersTable } from "../tasks/team-members.schema";

export const usersTable = pgTable("users", {
	id: id(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	name: varchar("name", { length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	avatar: varchar("avatar", { length: 255 }),
	companyId: uuid("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	active: boolean("active").default(true),
	lastLogin: timestamp("last_login"),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const usersRelations = relations(usersTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [usersTable.companyId],
		references: [companiesTable.id],
	}),
	userRoles: many(userRolesTable),
	teamMembers: many(teamMembersTable),
	tasks: many(tasksTable, { relationName: "assignee" }),
	createdTasks: many(tasksTable, { relationName: "creator" }),
	comments: many(commentsTable),
}));
