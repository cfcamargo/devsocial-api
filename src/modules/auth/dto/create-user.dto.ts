import { z } from "zod";

export const CreateUserDtoSchema = z.object({
  name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  document: z.string().min(11, "O documento deve conter pelo menos 11 dígitos"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
