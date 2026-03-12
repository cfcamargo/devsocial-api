import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const authPlugin = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET || "super-secret-key",
        exp: "7d",
      }),
    )
    .derive(async ({ jwt, cookie: { auth_token } }) => {
      // Tenta extrair o token diretamente dos cookies
      const token = auth_token?.value as string | undefined;

      if (!token) return { user: null };

      // Verifica o token usando a chave secreta
      const payload = await jwt.verify(token);
      if (!payload) return { user: null };

      return {
        // Retornamos o payload no formato que inserimos no momento do login
        user: payload as { sub: string; name: string; email: string },
      };
    })
    // Macro para verificar se o usuário está logado
    .macro(({ onBeforeHandle }) => ({
      isAuth(required: boolean) {
        if (!required) return;

        onBeforeHandle((ctx: any) => {
          if (!ctx.user) {
            ctx.set.status = 401;
            return { message: "Não autorizado" };
          }
        });
      },
    }));
