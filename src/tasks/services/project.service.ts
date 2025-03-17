import { ProjectRepository } from "../repositories/project.repository";
import { NotFoundError, ConflictError } from "../../utils/errors";
import {
  CreateProjectDto,
  UpdateProjectDto,
  Project,
} from "../models/project.model";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.findAll();
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundError(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(data: CreateProjectDto): Promise<Project> {
    try {
      return await this.projectRepository.create(data);
    } catch (error) {
      if (
        error.message?.includes("unique constraint") ||
        error.code === "23505"
      ) {
        throw new ConflictError("A project with this name already exists");
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateProjectDto): Promise<Project> {
    await this.findById(id);
    return await this.projectRepository.update(id, data);
  }

  async delete(id: string): Promise<Project> {
    await this.findById(id);
    return await this.projectRepository.delete(id);
  }
}
