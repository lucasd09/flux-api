import { UserRepository } from "../../core/repositories/user.repository";
import { CreateUserDto } from "../../core/models/user.model";
import bcrypt from "bcrypt";

export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async register(data: CreateUserDto) {
    const existingUser = await this.repository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    return this.repository.create(data);
  }

  async login(email: string, password: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    return await new Response(
      new Blob([JSON.stringify({ id: user.id, email: user.email })]),
    ).text();
  }
}
