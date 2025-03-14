import { Hono } from "hono";
import { UserService } from "../services/user.service";
import { zValidator } from "@hono/zod-validator";
import {
  UserRoleSchema,
  createUserSchema,
  updateUserSchema,
} from "../models/user.model";

const userController = new Hono();
const userService = new UserService();

userController.get("/", async (c) => {
  const users = await userService.findAll();
  return c.json({ success: true, data: users });
});

userController.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await userService.findById(id);
    return c.json({ success: true, data: user });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.get("/email/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const user = await userService.findByEmail(email);
    return c.json({ success: true, data: user });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.post("/", zValidator("json", createUserSchema), async (c) => {
  try {
    const data = await c.req.json();
    const user = await userService.create(data);
    return c.json({ success: true, data: user }, 201);
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.put("/:id", zValidator("json", updateUserSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const user = await userService.update(id, data);
    return c.json({ success: true, data: user });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await userService.delete(id);
    return c.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.patch("/:id/deactivate", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await userService.deactivate(id);
    return c.json({ success: true, data: user });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.patch("/:id/activate", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await userService.activate(id);
    return c.json({ success: true, data: user });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.get("/roles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await userService.getUserRoles(id);
    return c.json({ success: true, data: user });
  } catch (error) {
    return c.json(
      { success: false, message: error.message },
      error.status || 500,
    );
  }
});

userController.post(
  "/roles/assign",
  zValidator("json", UserRoleSchema),
  async (c) => {
    try {
      const data = await c.req.json();
      const userRole = await userService.assignRoleToUser(
        data.userId,
        data.roleId,
      );

      return c.json({ success: true, data: userRole });
    } catch (error) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  },
);

userController.post(
  "/roles/remove",
  zValidator("json", UserRoleSchema),
  async (c) => {
    try {
      const data = await c.req.json();
      const userRole = await userService.removeRoleFromUser(
        data.userId,
        data.roleId,
      );

      return c.json({ success: true, data: userRole });
    } catch (error) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  },
);

export { userController };
