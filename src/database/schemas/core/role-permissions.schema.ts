import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { rolesTable } from "./roles.schema";
import { permissionsTable } from "./permissions.schema";
import { createdAt } from "../utils";

export const rolePermissionsTable = pgTable(
	"role_permissions",
	{
		roleId: uuid("role_id")
			.notNull()
			.references(() => rolesTable.id, { onDelete: "cascade" }),
		permissionId: uuid("permission_id")
			.notNull()
			.references(() => permissionsTable.id, { onDelete: "cascade" }),
		createdAt: createdAt(),
	},
	(table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const rolePermissionsRelations = relations(
	rolePermissionsTable,
	({ one }) => ({
		role: one(rolesTable, {
			fields: [rolePermissionsTable.roleId],
			references: [rolesTable.id],
		}),
		permission: one(permissionsTable, {
			fields: [rolePermissionsTable.permissionId],
			references: [permissionsTable.id],
		}),
	}),
);
