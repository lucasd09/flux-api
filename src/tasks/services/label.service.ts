import { LabelRepository } from "../repositories/label.repository";
import { NotFoundError, ConflictError } from "../../utils/errors";
import { CreateLabelDto, UpdateLabelDto, Label } from "../models/label.model";

export class LabelService {
  private labelRepository: LabelRepository;

  constructor() {
    this.labelRepository = new LabelRepository();
  }

  async findAll(): Promise<Label[]> {
    return await this.labelRepository.findAll();
  }

  async findById(id: string): Promise<Label> {
    const label = await this.labelRepository.findById(id);
    if (!label) {
      throw new NotFoundError(`Label with ID ${id} not found`);
    }
    return label;
  }

  async create(data: CreateLabelDto): Promise<Label> {
    try {
      return await this.labelRepository.create(data);
    } catch (error) {
      if (
        error.message?.includes("unique constraint") ||
        error.code === "23505"
      ) {
        throw new ConflictError("A label with this name already exists");
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateLabelDto): Promise<Label> {
    await this.findById(id);
    return await this.labelRepository.update(id, data);
  }

  async delete(id: string): Promise<Label> {
    await this.findById(id);
    return await this.labelRepository.delete(id);
  }
}
