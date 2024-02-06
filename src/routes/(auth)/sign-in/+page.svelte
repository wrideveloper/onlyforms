<script lang="ts">
	import { Loader2 } from "lucide-svelte";
	import toast from "svelte-french-toast";
	import { signIn } from "@auth/sveltekit/client";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { createForm } from "felte";
	import { validator } from "@felte/validator-zod";
	import { authSchema, type AuthSchema } from "$lib/schema/auth";
	import { goto } from "$app/navigation";

	const { form, isSubmitting, errors } = createForm<AuthSchema>({
		extend: validator<AuthSchema>({ schema: authSchema }),
		onSubmit: signInWithCredentials,
		onError: handleErrors,
		onSuccess: handleSuccess,
	});

	async function signInWithCredentials(values: AuthSchema) {
		const response = await signIn("credentials", {
			username: values.username,
			password: values.password,
			redirect: false,
		});
		if (response === undefined) {
			throw new Error("Failed to sign in due to unknown error. Please report to the developer.");
		}
		const data = await response.json();

		// not sure of a better way to handle this, authjs returns a url with an error query param
		// when there's an error, so we check for that
		if ("url" in data) {
			const url = new URL(data.url);
			if (url.searchParams.has("error")) {
				throw new Error("Incorrect username or password. Please try again.");
			}
		}

		return data;
	}

	function handleSuccess() {
		toast.success("Signed in successfully!");
		goto("/app");
	}

	function handleErrors(error: unknown) {
		if (error instanceof Error) {
			toast.error(error.message);
			return;
		}
		toast.error("Failed to sign in due to unknown error. Please report to the developer.");
	}
</script>

<form use:form method="POST">
	<Card.Root class="max-w-screen-md w-[26rem]">
		<Card.Header>
			<Card.Title>Sign In to OnlyForms</Card.Title>
			<Card.Description>Sign In to access your OnlyForms account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col w-full items-center gap-4">
				<div class="flex flex-col gap-2 w-full">
					<Label for="name">Username / Email</Label>
					<Input id="username" name="username" placeholder="john.doe@gmail.com" />
					{#if $errors.username}
						<p class="text-sm text-red-500">{$errors.username}</p>
					{/if}
				</div>
				<div class="flex flex-col gap-2 w-full">
					<Label for="name">Password</Label>
					<Input id="password" name="password" type="password" placeholder="********" />
					{#if $errors.password}
						<p class="text-sm text-red-500">{$errors.password}</p>
					{/if}
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-center">
			<Button type="submit" disabled={$isSubmitting}>
				{#if $isSubmitting}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					Signing In
				{:else}
					Sign In
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
