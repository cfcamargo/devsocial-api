import { Elysia } from "elysia";
import { CreateUserDtoSchema } from "./dto/create-user.dto";
import { SignInDtoSchema } from "./dto/sign-in.dto";
import { authService } from "./auth.service";
import { authPlugin } from "../../core/auth/auth.plugin";

export const AuthRoute = new Elysia({ prefix: "/auth" })
  .use(authPlugin)
  .post(
    "/sign-up",
    async ({ body, set }) => {
      try {
        const parsedBody = CreateUserDtoSchema.parse(body);

        const user = await authService.createAccount(parsedBody);
        set.status = 201;
        return {
          message: "Conta criada com sucesso",
          user: { id: user.id, name: user.name, email: user.email },
        };
      } catch (error: any) {
        set.status = 400;
        if (error.errors) {
          return { message: "Erro de validação", errors: error.errors };
        }
        return { message: error.message || "Erro ao criar conta" };
      }
    },
    {
      detail: { tags: ["auth"], summary: "Registro de usuário" },
    },
  )
  .post(
    "/sign-in",
    async ({ body, jwt, set, cookie: { auth_token } }) => {
      try {
        const parsedBody = SignInDtoSchema.parse(body);

        const user = await authService.signIn(parsedBody);

        const token = await jwt.sign({
          sub: String(user.id),
          name: user.name,
          email: user.email,
        });

        // Configura o cookie com httpOnly para segurança extra
        auth_token.set({
          value: token,
          httpOnly: true,
          maxAge: 7 * 86400, // 7 dias
          path: "/",
          sameSite: "lax", // O navegador enviará o cookie apenas para o mesmo domínio
          secure: process.env.NODE_ENV === "production", // Habilitar em produção com HTTPS
        });

        return {
          message: "Login realizado com sucesso",
        };
      } catch (error: any) {
        set.status = 401;
        if (error.errors) {
          return { message: "Erro de validação", errors: error.errors };
        }
        return { message: error.message || "Não autorizado" };
      }
    },
    {
      detail: { tags: ["auth"], summary: "Login de usuário" },
    },
  )
  .post(
    "/sign-out",
    ({ cookie: { auth_token } }) => {
      // Remove o cookie para deslogar
      auth_token.remove();
      return { message: "Logout realizado com sucesso" };
    },
    {
      isAuth: true,
      detail: { tags: ["auth"], summary: "Logout do usuário" },
    },
  )
  .get(
    "/me",
    ({ user }) => {
      return { user };
    },
    {
      isAuth: true,
      detail: {
        tags: ["auth"],
        summary: "Obter perfil do usuário logado",
      },
    },
  );
