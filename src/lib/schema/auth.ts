import { z } from "zod";

export const authSchema = z.object({
	username: z.string().trim(),
	password: z.string().min(8).max(32),
});
export type AuthSchema = z.infer<typeof authSchema>;
