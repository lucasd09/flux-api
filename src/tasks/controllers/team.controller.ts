import { Hono } from "hono";
import { TeamService } from "../services/team.service";
import { zValidator } from "@hono/zod-validator";
import { createTeamSchema, updateTeamSchema } from "../models/team.model";

const teamController = new Hono();
const teamService = new TeamService();

teamController.get("/", async (c) => {
  const teams = await teamService.findAll();
  return c.json({ success: true, data: teams });
});

teamController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const team = await teamService.findById(id);
    return c.json({ success: true, data: team });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

teamController.post("/", zValidator("json", createTeamSchema), async (c) => {
  try {
    const data = await c.req.json();
    const team = await teamService.create(data);
    return c.json({ success: true, data: team }, 201);
  } catch (error) {
    if (error.name === "ConflictError") {
      return c.json({ success: false, message: error.message }, 409);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

teamController.put("/:id", zValidator("json", updateTeamSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const team = await teamService.update(id, data);
    return c.json({ success: true, data: team });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

teamController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await teamService.delete(id);
    return c.json({ success: true, message: "Team deleted successfully" });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

export { teamController };
