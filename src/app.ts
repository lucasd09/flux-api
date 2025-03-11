import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

// Middlewares
app.use(logger());
app.use(cors());

// Default Routes
app.get("/", (c) => c.json({ message: "Welcome to Hono API!" }));
app.notFound((c) => c.text("Not Found", 404));

export default app;
