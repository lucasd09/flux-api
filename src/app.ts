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
import authController from "./auth/controllers/auth.controller";
import { jwtMiddleware } from "./middlewares/jwt";
import createApp from "./utils/create-app";

const app = createApp();

//routes - public
app.route("/auth", authController);
app.route("/companies", companyController);

jwtMiddleware(app);

//routes - core
app.route("/users", userController);
app.route("/roles", roleController);
app.route("/permissions", permissionController);

//routes - tasks
app.route("/projects", projectController);
app.route("/labels", labelController);
app.route("/comments", commentController);
app.route("/tasks", taskController);
app.route("/teams", teamController);

// Middlewares
app.use(logger());
app.use(cors());
jwtMiddleware(app);

export default app;
