import z from "zod";
import { registerSchema } from "./register-form.schema";

export const updateProfileSchema = registerSchema
  .pick({
    email: true,
    firstName: true,
    lastName: true,
    username: true,
    phone: true,
  })
  .partial();

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
