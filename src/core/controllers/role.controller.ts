import { Hono } from "hono";
import { RoleService } from "../services/role.service";
import { zValidator } from "@hono/zod-validator";
import { createRoleSchema, updateRoleSchema } from "../models/role.model";
import { NotFoundError } from "../../utils/errors";

const roleController = new Hono();
const roleService = new RoleService();

roleController.get("/", async (c) => {
  const roles = await roleService.findAll();
  return c.json({ success: true, data: roles });
});

roleController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const role = await roleService.findById(id);
    return c.json({ success: true, data: role });
  } catch (error) {
    return c.json({ success: false, message: error.message }, 404);
  }
});

roleController.post("/", zValidator("json", createRoleSchema), async (c) => {
  try {
    const data = await c.req.json();
    const role = await roleService.create(data);
    return c.json({ success: true, data: role }, 201);
  } catch (error) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

roleController.put("/:id", zValidator("json", updateRoleSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const role = await roleService.update(id, data);
    return c.json({ success: true, data: role });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error instanceof NotFoundError ? 404 : 500,
    );
  }
});

roleController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await roleService.delete(id);
    return c.json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    return c.json({ success: false, message: error.message }, 404);
  }
});

export { roleController };
