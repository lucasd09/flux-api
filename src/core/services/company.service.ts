import { NotFoundError, ConflictError } from "../../utils/errors";
import {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
} from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async findAll(includeInactive = false): Promise<Company[]> {
    return await this.companyRepository.findAll(includeInactive);
  }

  async findById(id: string): Promise<Company> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundError(`Company with ID ${id} not found`);
    }

    return company;
  }

  async findBySlug(slug: string): Promise<Company> {
    const company = await this.companyRepository.findBySlug(slug);

    if (!company) {
      throw new NotFoundError(`Company with slug ${slug} not found`);
    }

    return company;
  }

  async create(data: CreateCompanyDto): Promise<Company> {
    try {
      return await this.companyRepository.create(data);
    } catch (error) {
      if (
        error.message?.includes("unique constraint") ||
        error.code === "23505"
      ) {
        throw new ConflictError("A company with this name already exists");
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateCompanyDto): Promise<Company> {
    await this.findById(id);

    try {
      return await this.companyRepository.update(id, data);
    } catch (error) {
      if (
        error.message?.includes("unique constraint") ||
        error.code === "23505"
      ) {
        throw new ConflictError("A company with this name already exists");
      }
      throw error;
    }
  }

  async delete(id: string): Promise<Company> {
    await this.findById(id);

    return await this.companyRepository.delete(id);
  }

  async deactivate(id: string): Promise<Company> {
    await this.findById(id);

    return await this.companyRepository.deactivate(id);
  }

  async activate(id: string): Promise<Company> {
    await this.findById(id);

    return await this.companyRepository.activate(id);
  }
}
