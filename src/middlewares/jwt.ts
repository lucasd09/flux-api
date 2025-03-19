import { Hono } from "hono";
import { jwt } from "hono/jwt";

export const jwtMiddleware = (app: Hono) => {
  app.use("*", async (c, next) => {
    if (c.req.path.startsWith("/auth/")) {
      return next();
    }
    if (c.req.path.startsWith("/docs/")) {
      return next();
    }

    return jwt({ secret: process.env.JWT_SECRET || "" })(c, next);
  });
};
