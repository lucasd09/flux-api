import { TeamRepository } from "../repositories/team.repository";
import { NotFoundError, ConflictError } from "../../utils/errors";
import { CreateTeamDto, UpdateTeamDto, Team } from "../models/team.model";

export class TeamService {
  private teamRepository: TeamRepository;

  constructor() {
    this.teamRepository = new TeamRepository();
  }

  async findAll(): Promise<Team[]> {
    return await this.teamRepository.findAll();
  }

  async findById(id: string): Promise<Team> {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new NotFoundError(`Team with ID ${id} not found`);
    }
    return team;
  }

  async create(data: CreateTeamDto): Promise<Team> {
    try {
      return await this.teamRepository.create(data);
    } catch (error) {
      if (
        error.message?.includes("unique constraint") ||
        error.code === "23505"
      ) {
        throw new ConflictError("A team with this name already exists");
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateTeamDto): Promise<Team> {
    await this.findById(id);
    return await this.teamRepository.update(id, data);
  }

  async delete(id: string): Promise<Team> {
    await this.findById(id);
    return await this.teamRepository.delete(id);
  }
}
