import { Hono } from "hono";
import { LabelService } from "../services/label.service";
import { zValidator } from "@hono/zod-validator";
import { createLabelSchema, updateLabelSchema } from "../models/label.model";

const labelController = new Hono();
const labelService = new LabelService();

labelController.get("/", async (c) => {
  const labels = await labelService.findAll();
  return c.json({ success: true, data: labels });
});

labelController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const label = await labelService.findById(id);
    return c.json({ success: true, data: label });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

labelController.post("/", zValidator("json", createLabelSchema), async (c) => {
  try {
    const data = await c.req.json();
    const label = await labelService.create(data);
    return c.json({ success: true, data: label }, 201);
  } catch (error) {
    if (error.name === "ConflictError") {
      return c.json({ success: false, message: error.message }, 409);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

labelController.put(
  "/:id",
  zValidator("json", updateLabelSchema),
  async (c) => {
    try {
      const id = c.req.param("id");
      const data = await c.req.json();
      const label = await labelService.update(id, data);
      return c.json({ success: true, data: label });
    } catch (error) {
      if (error.name === "NotFoundError") {
        return c.json({ success: false, message: error.message }, 404);
      }
      return c.json({ success: false, message: "An error occurred" }, 500);
    }
  },
);

labelController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await labelService.delete(id);
    return c.json({ success: true, message: "Label deleted successfully" });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return c.json({ success: false, message: error.message }, 404);
    }
    return c.json({ success: false, message: "An error occurred" }, 500);
  }
});

export { labelController };
