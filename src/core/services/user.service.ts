import { NotFoundError, ConflictError } from "../../utils/errors";
import {
  CreateUserDto,
  UpdateUserDto,
  ReadUserDto,
} from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async findAll(): Promise<ReadUserDto[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<ReadUserDto> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<ReadUserDto> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new NotFoundError(`User with email ${email} not found`);
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<ReadUserDto> {
    try {
      return await this.repository.create(data);
    } catch (error) {
      if (
        error.message?.includes("unique constraint") ||
        error.code === "23505"
      ) {
        throw new ConflictError("A user with this email already exists");
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateUserDto): Promise<ReadUserDto> {
    await this.findById(id);

    try {
      return await this.repository.update(id, data);
    } catch (error) {
      if (
        error.message?.includes("unique constraint") ||
        error.code === "23505"
      ) {
        throw new ConflictError("A user with this email already exists");
      }
      throw error;
    }
  }

  async delete(id: string): Promise<ReadUserDto> {
    await this.findById(id);
    return await this.repository.delete(id);
  }

  async activate(id: string): Promise<ReadUserDto> {
    await this.findById(id);
    return await this.repository.activate(id);
  }

  async deactivate(id: string): Promise<ReadUserDto> {
    await this.findById(id);
    return await this.repository.deactivate(id);
  }
}
