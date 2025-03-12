import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { companyController } from "./core/controllers/company.controller";

const app = new Hono();

// Middlewares
app.use(logger());
app.use(cors());

// Default Routes
app.get("/", (c) => c.json({ message: "Welcome to Hono API!" }));

//routes
app.route("/companies", companyController);

app.notFound((c) => c.text("Not Found", 404));

export default app;
