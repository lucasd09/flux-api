import { PermissionRepository } from "../repositories/permission.repository";
import { NotFoundError, ConflictError } from "../../utils/errors";
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  Permission,
} from "../models/permission.model";

export class PermissionService {
  private repository: PermissionRepository;

  constructor() {
    this.repository = new PermissionRepository();
  }

  async findAll(): Promise<Permission[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Permission> {
    const permission = await this.repository.findById(id);
    if (!permission) {
      throw new NotFoundError(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async create(data: CreatePermissionDto): Promise<Permission> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictError("A permission with this name already exists");
      }
      throw error;
    }
  }

  async update(id: string, data: UpdatePermissionDto): Promise<Permission> {
    await this.findById(id);
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<Permission> {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
