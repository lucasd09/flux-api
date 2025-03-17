import { Hono } from "hono";
import { TaskService } from "../services/task.service";
import { zValidator } from "@hono/zod-validator";
import { createTaskSchema, updateTaskSchema } from "../models/task.model";

const taskController = new Hono();
const taskService = new TaskService();

taskController.get("/", async (c) => {
  const tasks = await taskService.findAll();
  return c.json({ success: true, data: tasks });
});

taskController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const task = await taskService.findById(id);
    return c.json({ success: true, data: task });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

taskController.post("/", zValidator("json", createTaskSchema), async (c) => {
  try {
    const data = await c.req.json();
    const task = await taskService.create(data);
    return c.json({ success: true, data: task }, 201);
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

taskController.put("/:id", zValidator("json", updateTaskSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const task = await taskService.update(id, data);
    return c.json({ success: true, data: task });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

taskController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await taskService.delete(id);
    return c.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

export { taskController };
