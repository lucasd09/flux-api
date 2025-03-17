import { Hono } from "hono";
import { ProjectService } from "../services/project.service";
import { zValidator } from "@hono/zod-validator";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../models/project.model";

const projectController = new Hono();
const projectService = new ProjectService();

projectController.get("/", async (c) => {
  const projects = await projectService.findAll();
  return c.json({ success: true, data: projects });
});

projectController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const project = await projectService.findById(id);
    return c.json({ success: true, data: project });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

projectController.post(
  "/",
  zValidator("json", createProjectSchema),
  async (c) => {
    try {
      const data = await c.req.json();
      const project = await projectService.create(data);
      return c.json({ success: true, data: project }, 201);
    } catch (error) {
      if (error.name === "ConflictError") {
        return c.json({ success: false, message: error.message }, 409);
      }
      return c.json({ success: false, message: "An error occurred" }, 500);
    }
  },
);

projectController.put(
  "/:id",
  zValidator("json", updateProjectSchema),
  async (c) => {
    try {
      const id = c.req.param("id");
      const data = await c.req.json();
      const project = await projectService.update(id, data);
      return c.json({ success: true, data: project });
    } catch (error) {
      if (error.name === "NotFoundError") {
        return c.json({ success: false, message: error.message }, 404);
      }
      return c.json({ success: false, message: "An error occurred" }, 500);
    }
  },
);

projectController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await projectService.delete(id);
    return c.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

export { projectController };
