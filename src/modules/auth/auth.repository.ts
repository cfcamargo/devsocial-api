import { db } from "../../core/db";
import { usersTable } from "../../core/db/schemas/user";
import { CreateUserDto } from "./dto/create-user.dto";

export const authRepository = {
  async createUser(dto: CreateUserDto) {
    return await db.insert(usersTable).values(dto);
  },
};
