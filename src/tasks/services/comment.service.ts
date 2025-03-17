import { CreateCommentDto, UpdateCommentDto } from "../models/comment.model";
import { CommentRepository } from "../repositories/comment.repository";

export class CommentService {
  private repository: CommentRepository;

  constructor() {
    this.repository = new CommentRepository();
  }

  async getByTask(taskId: string) {
    return await this.repository.findAllByTask(taskId);
  }

  async get(id: string) {
    return await this.repository.findById(id);
  }

  async create(data: CreateCommentDto) {
    return await this.repository.create(data);
  }

  async update(id: string, data: UpdateCommentDto) {
    return await this.repository.update(id, data);
  }

  async delete(id: string) {
    return await this.repository.delete(id);
  }
}
