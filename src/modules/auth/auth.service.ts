import { hash } from "bun";
import { CreateUserDto } from "./dto/create-user.dto";
import { passwordHash } from "../../utils/password-hash";
import { authRepository } from "./auth.repository";

export const categoryService = {
  async createAccount(dto: CreateUserDto) {
    dto.password = await passwordHash.hashPassword(dto.password);
    return authRepository.createUser(dto);
  },
};
