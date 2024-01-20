import * as argon2 from "argon2";
import { SvelteKitAuth } from "@auth/sveltekit";
import CredentialsProvider from "@auth/sveltekit/providers/credentials";
import { getUserByEmailOrUsername } from "$lib/server/repositories/user-repository";
import { type Handle, redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { wrapResult } from "$lib/utils";
import { authSchema } from "$lib/schema/auth";
import { dev } from "$app/environment";

const authorization: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	// redirect for index path
	if (pathname === "/") {
		throw redirect(303, "/app");
	}

	const session = await event.locals.getSession();

	if (!session) {
		if (pathname.startsWith("/app")) {
			throw redirect(303, "/sign-in");
		}
	}

	if (session) {
		if (pathname.startsWith("/sign-in")) {
			throw redirect(303, "/app");
		}
	}

	return resolve(event);
};

export const handle = sequence(
	SvelteKitAuth({
		providers: [
			CredentialsProvider({
				id: "credentials",
				authorize: async (credentials) => {
					const validatedCredentials = authSchema.safeParse(credentials);
					if (!validatedCredentials.success) {
						return null;
					}

					// TODO(elianiva): only for temporary development purpose, please remove later
					if (dev) {
						if (
							validatedCredentials.data.username === "admin" &&
							validatedCredentials.data.password === "password"
						) {
							return {
								id: "admin",
								username: "admin",
								fullname: "Administrator",
								email: "admin@localhost",
								role: "admin",
							};
						}
					}

					const [user, userError] = await wrapResult(
						getUserByEmailOrUsername(validatedCredentials.data.username as string),
					);
					if (user === null || userError !== null) {
						return null;
					}

					const [isPasswordMatch, verifyError] = await wrapResult(
						argon2.verify(user.password, validatedCredentials.data.password as string, {
							type: argon2.argon2i,
						}),
					);
					if (!isPasswordMatch || verifyError !== null) {
						return null;
					}

					return {
						id: user._id.toHexString(),
						username: user.username,
						fullname: user.fullname,
						email: user.email,
						role: user.role,
					};
				},
			}),
		],
		session: {
			strategy: "jwt",
		},
		callbacks: {
			async jwt({ token, user }) {
				if (user) {
					token.sub = user.id;
					token.user = {
						id: user.id,
						username: user.username,
						fullname: user.fullname,
						email: user.email,
						role: user.role,
					};
				}
				return token;
			},
			async session({ session, token }) {
				session.user = token.user;
				return session;
			},
		},
		pages: {
			signIn: "/sign-in",
		},
	}),
	authorization,
);
