import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../utils";
import { relations } from "drizzle-orm";
import { rolePermissionsTable } from "./role-permissions.schema";

export const permissionsTable = pgTable("permissions", {
	id: id(),
	name: varchar("name", { length: 100 }).notNull().unique(),
	description: text("description"),
	module: varchar("module", { length: 100 }).notNull(),
	action: varchar("action", { length: 100 }).notNull(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
});

export const permissionsRelations = relations(permissionsTable, ({ many }) => ({
	rolePermissions: many(rolePermissionsTable),
}));
