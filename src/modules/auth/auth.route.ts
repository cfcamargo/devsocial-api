import { Elysia } from "elysia";
import { CreateUserDtoSchema } from "./dto/create-user.dto";

export const AuthRoute = new Elysia({ prefix: "/auth" }).post(
  "/sign-up",
  async ({ body }) => {},
  {
    body: CreateUserDtoSchema,
    detail: { tags: ["auth"] },
  },
);
