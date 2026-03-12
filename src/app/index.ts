import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { AuthRoute } from "../modules/auth/auth.route";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        info: {
          title: "DevSocial API",
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
    }),
  )
  .use(AuthRoute)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
console.log(
  `📕 Docs is running at http://${app.server?.hostname}:${app.server?.port}/openapi`,
);
