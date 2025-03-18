import { Hono } from "hono";
import { AuthService } from "../services/auth.service";

const authController = new Hono();
const service = new AuthService();

authController.post("/register", async (c) => {
  try {
    const data = await c.req.json();
    await service.register(data);

    return c.json({ message: "User registered successfully" });
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

authController.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const token = await service.login(email, password);

    return c.json({ token });
  } catch (error) {
    return c.json({ error: error.message }, 401);
  }
});

export default authController;
