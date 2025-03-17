import { TaskRepository } from "../repositories/task.repository";
import { NotFoundError } from "../../utils/errors";
import { CreateTaskDto, UpdateTaskDto, Task } from "../models/task.model";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(data: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.create(data);
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    await this.findById(id);
    return await this.taskRepository.update(id, data);
  }

  async delete(id: string): Promise<Task> {
    await this.findById(id);
    return await this.taskRepository.delete(id);
  }
}
