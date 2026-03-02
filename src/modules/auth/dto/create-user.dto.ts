import z from "zod";

export const CreateUserDtoSchema = z.object({
  name: z.string().min(5, "O nome deve conter pelo menos 3 digitos"),
  email: z.email(),
  document: z.string().min(11),
  password: z.string().min(8),
});

export type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;
