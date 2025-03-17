import { Hono } from "hono";
import { CommentService } from "../services/comment.service";
import { zValidator } from "@hono/zod-validator";
import {
  createCommentSchema,
  updateCommentSchema,
} from "../models/comment.model";

const commentController = new Hono();
const commentService = new CommentService();

commentController.get("/task/:taskId", async (c) => {
  const taskId = c.req.param("taskId");
  const comments = await commentService.getCommentsByTask(taskId);
  return c.json({ success: true, data: comments });
});

commentController.get("/:id", async (c) => {
  const id = c.req.param("id");
  const comment = await commentService.getComment(id);
  return c.json({ success: true, data: comment });
});

commentController.post(
  "/",
  zValidator("json", createCommentSchema),
  async (c) => {
    const data = await c.req.json();
    const comment = await commentService.createComment(data);
    return c.json({ success: true, data: comment }, 201);
  },
);

commentController.put(
  "/:id",
  zValidator("json", updateCommentSchema),
  async (c) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    const comment = await commentService.updateComment(id, data);
    return c.json({ success: true, data: comment });
  },
);

commentController.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await commentService.deleteComment(id);
  return c.json({ success: true, message: "Comment deleted successfully" });
});

export { commentController };
