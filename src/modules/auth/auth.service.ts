import { passwordHash } from "../../utils/password-hash";
import { authRepository } from "./auth.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";

export const authService = {
  async createAccount(dto: CreateUserDto) {
    const existingUser = await authRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error("E-mail já está em uso");
    }

    dto.password = await passwordHash.hashPassword(dto.password);
    return await authRepository.createUser(dto);
  },

  async signIn(dto: SignInDto) {
    const user = await authRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const isValid = await passwordHash.verifyPasswordHash(
      dto.password,
      user.password,
    );
    if (!isValid) {
      throw new Error("Credenciais inválidas");
    }

    return user;
  },
};
