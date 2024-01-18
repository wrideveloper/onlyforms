import { userSchema, type UserSchema } from "$lib/schema/user";
import { dbClient } from "$lib/server/repositories/db-client";
import { MONGO_DB } from "$env/static/private";

export const USER_COLLECTION_NAME = "users";

export async function getUserByEmailOrUsername(emailOrUsername: string): Promise<UserSchema | null> {
	const user = await dbClient.db(MONGO_DB).collection(USER_COLLECTION_NAME).findOne({
		$or: [
			{ email: emailOrUsername },
			{ username: emailOrUsername }
		]
	});
	if (user === null) return null;
	return userSchema.parse(user);
}