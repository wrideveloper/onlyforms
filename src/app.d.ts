import "@auth/sveltekit";

declare module "@auth/sveltekit" {
	interface User {
		id: string;
		fullname: string;
		email: string;
		username: string;
		role: string;
	}
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}


export {};
