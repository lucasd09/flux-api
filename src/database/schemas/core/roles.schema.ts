import { boolean, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../utils";
import { relations } from "drizzle-orm";
import { companiesTable } from "./companies.schema";
import { rolePermissionsTable } from "./role-permissions.schema";
import { userRolesTable } from "./user-roles.schema";

export const rolesTable = pgTable("roles", {
	id: id(),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description"),
	companyId: uuid("company_id")
		.notNull()
		.references(() => companiesTable.id, { onDelete: "cascade" }),
	isSystem: boolean("is_system").default(false),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const rolesRelations = relations(rolesTable, ({ one, many }) => ({
	company: one(companiesTable, {
		fields: [rolesTable.companyId],
		references: [companiesTable.id],
	}),
	userRoles: many(userRolesTable),
	rolePermissions: many(rolePermissionsTable),
}));
