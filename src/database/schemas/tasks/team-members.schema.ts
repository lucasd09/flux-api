import { pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { relations } from "drizzle-orm";
import { teamsTable } from "./teams.schema";
import { usersTable } from "../core/users.schema";

export const teamMembersTable = pgTable(
	"team_members",
	{
		teamId: uuid("team_id")
			.notNull()
			.references(() => teamsTable.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => usersTable.id, { onDelete: "cascade" }),
		role: varchar("role", { length: 50 }).default("member"),
		joinedAt: createdAt(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.teamId] })],
);

export const teamMembersRelations = relations(teamMembersTable, ({ one }) => ({
	team: one(teamsTable, {
		fields: [teamMembersTable.teamId],
		references: [teamsTable.id],
	}),
	user: one(usersTable, {
		fields: [teamMembersTable.userId],
		references: [usersTable.id],
	}),
}));
