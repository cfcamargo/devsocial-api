import { db } from "../../core/db";
import { usersTable } from "../../core/db/schemas/user";
import { CreateUserDto } from "./dto/create-user.dto";
import { eq } from "drizzle-orm";

export const authRepository = {
  async createUser(dto: CreateUserDto) {
    const [user] = await db.insert(usersTable).values(dto).returning();
    return user;
  },

  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return user;
  },
};
