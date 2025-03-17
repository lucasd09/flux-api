import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { companyController } from "./core/controllers/company.controller";
import { userController } from "./core/controllers/user.controller";
import { roleController } from "./core/controllers/role.controller";
import { permissionController } from "./core/controllers/permission.controller";
import { projectController } from "./tasks/controllers/project.controller";
import { labelController } from "./tasks/controllers/label.controller";
import { commentController } from "./tasks/controllers/comment.controller";
import { taskController } from "./tasks/controllers/task.controller";
import { teamController } from "./tasks/controllers/team.controller";

const app = new Hono();

// Middlewares
app.use(logger());
app.use(cors());

//routes - auth

//routes - core
app.route("/companies", companyController);
app.route("/users", userController);
app.route("/roles", roleController);
app.route("/permissions", permissionController);

//routes - tasks
app.route("/projects", projectController);
app.route("/labels", labelController);
app.route("/comments", commentController);
app.route("/tasks", taskController);
app.route("/teams", teamController);

app.notFound((c) => c.text("Not Found", 404));

export default app;
