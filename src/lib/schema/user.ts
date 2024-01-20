import * as argon2 from "argon2";
import { z } from "zod";
import { ObjectId } from "mongodb";

export const roleSchema = z.enum(["admin", "user"] as const);
export type RoleSchema = z.infer<typeof roleSchema>;

export const userSchema = z.object({
	_id: z.instanceof(ObjectId),
	fullname: z.string().min(4).max(255).trim(),
	username: z.string().min(4).max(255).trim(),
	password: z.string().min(8),
	email: z.string().email(),
	role: roleSchema,
	createdAt: z.date(),
	updatedAt: z.date()
});
export type UserSchema = z.infer<typeof userSchema>;