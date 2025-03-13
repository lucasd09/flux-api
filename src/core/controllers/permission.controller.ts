import { Hono } from "hono";
import { PermissionService } from "../services/permission.service";
import { zValidator } from "@hono/zod-validator";
import {
  createPermissionSchema,
  updatePermissionSchema,
} from "../models/permission.model";

const permissionController = new Hono();
const permissionService = new PermissionService();

permissionController.get("/", async (c) => {
  const permissions = await permissionService.findAll();
  return c.json({ success: true, data: permissions });
});

permissionController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const permission = await permissionService.findById(id);
    return c.json({ success: true, data: permission });
  } catch (error) {
    return c.json({ success: false, message: error.message }, 404);
  }
});

permissionController.post(
  "/",
  zValidator("json", createPermissionSchema),
  async (c) => {
    try {
      const data = await c.req.json();
      const permission = await permissionService.create(data);
      return c.json({ success: true, data: permission }, 201);
    } catch (error) {
      return c.json(
        { success: false, message: error.message },
        error.code === "23505" ? 409 : 500,
      );
    }
  },
);

permissionController.put(
  "/:id",
  zValidator("json", updatePermissionSchema),
  async (c) => {
    try {
      const id = c.req.param("id");
      const data = await c.req.json();
      const permission = await permissionService.update(id, data);
      return c.json({ success: true, data: permission });
    } catch (error) {
      return c.json({ success: false, message: error.message }, 404);
    }
  },
);

permissionController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await permissionService.delete(id);
    return c.json({
      success: true,
      message: "Permission deleted successfully",
    });
  } catch (error) {
    return c.json({ success: false, message: error.message }, 404);
  }
});

export { permissionController };
