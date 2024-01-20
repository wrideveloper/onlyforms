import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import * as argon2 from "argon2";
import { ObjectId } from "mongodb";
import type { UserSchema } from "$lib/schema/user";
import { USER_COLLECTION_NAME, getUserByEmailOrUsername } from "$lib/server/repositories/user-repository";
import { dbClient } from "$lib/server/repositories/db-client";

const DB_NAME = "onlyforms-test";

describe("user-repository", () => {
	const objectId = ObjectId.createFromHexString("fb57f193091e6e59c462741d");
	beforeAll(async () => {
		vi.mock("$env/static/private", async (importOriginal) => {
			const original = await importOriginal() as Record<string, string>;
			return {
				...original,
				MONGO_DB: "onlyforms-test"
			};
		});

		const hashedPassword = await argon2.hash("password", { type: argon2.argon2i });
		// insert data into database
		await dbClient.db(DB_NAME).collection(USER_COLLECTION_NAME).insertMany([
			{
				_id: objectId,
				fullname: "John Doe",
				username: "johndoe",
				email: "john.doe@gmail.com",
				password: hashedPassword,
				role: "admin",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		] satisfies UserSchema[]);
	});

	afterAll(async () => {
		await dbClient.db(DB_NAME).dropDatabase();
	});

	it("should return null when user is not found", async () => {
		const user = await getUserByEmailOrUsername("notfound");
		expect(user).toBeNull();
	});

	it("should get a user by their username", async () => {
		const user = await getUserByEmailOrUsername("johndoe");
		expect(user).toBeDefined();
		expect(user?.username).toBe("johndoe");
		expect(user?.email).toBe("john.doe@gmail.com");
		expect(user?.fullname).toBe("John Doe");
		expect(user?.role).toBe("admin");
		expect(user?.password).toBeDefined();
		expect(user?.createdAt).toBeInstanceOf(Date);
		expect(user?.updatedAt).toBeInstanceOf(Date);
	});

	it("should get a user by their email", async () => {
		const user = await getUserByEmailOrUsername("john.doe@gmail.com");
		expect(user).toBeDefined();
		expect(user?.username).toBe("johndoe");
		expect(user?.email).toBe("john.doe@gmail.com");
		expect(user?.fullname).toBe("John Doe");
		expect(user?.role).toBe("admin");
		expect(user?.password).toBeDefined();
		expect(user?.createdAt).toBeInstanceOf(Date);
		expect(user?.updatedAt).toBeInstanceOf(Date);
	});
});