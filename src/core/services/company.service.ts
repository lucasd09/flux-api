import { NotFoundError, ConflictError } from "../../utils/errors";
import { CreateCompanyDto, UpdateCompanyDto } from "../models/company.model";
import { CompanyRepository } from "../repositories/company.repository";

export class CompanyService {
  private companyRepository: CompanyRepository;

  constructor() {
    this.companyRepository = new CompanyRepository();
  }

  async getAllCompanies(includeInactive = false) {
    return await this.companyRepository.findAll(includeInactive);
  }

  async getCompanyById(id: string) {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundError(`Company with ID ${id} not found`);
    }

    return company;
  }

  async getCompanyBySlug(slug: string) {
    const company = await this.companyRepository.findBySlug(slug);

    if (!company) {
      throw new NotFoundError(`Company with slug ${slug} not found`);
    }

    return company;
  }

  async createCompany(data: CreateCompanyDto) {
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

  async updateCompany(id: string, data: UpdateCompanyDto) {
    await this.getCompanyById(id);

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

  async deleteCompany(id: string) {
    await this.getCompanyById(id);

    return await this.companyRepository.delete(id);
  }

  async deactivateCompany(id: string) {
    await this.getCompanyById(id);

    return await this.companyRepository.deactivate(id);
  }

  async activateCompany(id: string) {
    await this.getCompanyById(id);

    return await this.companyRepository.activate(id);
  }
}
