import { CreateCommentDto, UpdateCommentDto } from "../models/comment.model";
import { CommentRepository } from "../repositories/comment.repository";

export class CommentService {
  private repository: CommentRepository;

  constructor() {
    this.repository = new CommentRepository();
  }

  async getCommentsByTask(taskId: string) {
    return await this.repository.findAllByTask(taskId);
  }

  async getComment(id: string) {
    return await this.repository.findById(id);
  }

  async createComment(data: CreateCommentDto) {
    return await this.repository.create(data);
  }

  async updateComment(id: string, data: UpdateCommentDto) {
    return await this.repository.update(id, data);
  }

  async deleteComment(id: string) {
    return await this.repository.delete(id);
  }
}
