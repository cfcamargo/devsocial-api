import { z } from "zod";

export const SignInDtoSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type SignInDto = z.infer<typeof SignInDtoSchema>;
