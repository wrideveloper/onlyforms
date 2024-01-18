import { SvelteKitAuth } from "@auth/sveltekit";
import CredentialsProvider from "@auth/sveltekit/providers/credentials";

export const handle = SvelteKitAuth({
	providers: [CredentialsProvider({
		authorize: async (credentials) => {

		}
	})],
});