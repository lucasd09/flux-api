import { RoleRepository } from "../repositories/role.repository";
import { NotFoundError } from "../../utils/errors";
import { CreateRoleDto, UpdateRoleDto, Role } from "../models/role.model";

export class RoleService {
  private repository: RoleRepository;

  constructor() {
    this.repository = new RoleRepository();
  }

  async findAll(): Promise<Role[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<Role> {
    const role = await this.repository.findById(id);
    if (!role) {
      throw new NotFoundError(`Role with ID ${id} not found`);
    }
    return role;
  }

  async create(data: CreateRoleDto): Promise<Role> {
    return await this.repository.create(data);
  }

  async update(id: string, data: UpdateRoleDto): Promise<Role> {
    await this.findById(id);
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<Role> {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
