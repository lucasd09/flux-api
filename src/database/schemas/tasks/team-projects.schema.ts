import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "../utils";
import { relations } from "drizzle-orm";
import { projectsTable } from "./projects.schema";
import { teamsTable } from "./teams.schema";

export const teamProjectsTable = pgTable(
	"team_projects",
	{
		teamId: uuid("team_id")
			.notNull()
			.references(() => teamsTable.id, { onDelete: "cascade" }),
		projectId: uuid("project_id")
			.notNull()
			.references(() => projectsTable.id, { onDelete: "cascade" }),
		createdAt: createdAt(),
	},
	(table) => [primaryKey({ columns: [table.teamId, table.projectId] })],
);

export const teamProjectsRelations = relations(
	teamProjectsTable,
	({ one }) => ({
		team: one(teamsTable, {
			fields: [teamProjectsTable.teamId],
			references: [teamsTable.id],
		}),
		project: one(projectsTable, {
			fields: [teamProjectsTable.projectId],
			references: [projectsTable.id],
		}),
	}),
);
