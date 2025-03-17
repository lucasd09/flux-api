import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { companyController } from "./core/controllers/company.controller";
import { userController } from "./core/controllers/user.controller";
import { roleController } from "./core/controllers/role.controller";
import { permissionController } from "./core/controllers/permission.controller";

const app = new Hono();

// Middlewares
app.use(logger());
app.use(cors());

//routes
app.route("/companies", companyController);
app.route("/users", userController);
app.route("/roles", roleController);
app.route("/permissions", permissionController);

app.notFound((c) => c.text("Not Found", 404));

export default app;
