import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { relations } from "drizzle-orm";
import { usersTable } from "./users.schema";
import { rolesTable } from "./roles.schema";

export const userRolesTable = pgTable(
	"user_roles",
	{
		userId: uuid("user_id")
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		roleId: uuid("role_id")
			.notNull()
			.references(() => rolesTable.id, { onDelete: "cascade" }),
		createdAt: createdAt(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.roleId] })],
);

export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [userRolesTable.userId],
		references: [usersTable.id],
	}),
	role: one(rolesTable, {
		fields: [userRolesTable.roleId],
		references: [rolesTable.id],
	}),
}));
