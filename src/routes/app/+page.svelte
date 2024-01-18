<script>
	import { page } from "$app/stores";
	import Button from "$lib/components/ui/button/button.svelte";
	import { signOut } from "@auth/sveltekit/client";
</script>

<div class="w-full h-full flex flex-col gap-4 items-center justify-center">
	<h1 class="text-2xl">
		Hello there, you're authenticated as {$page.data.session?.user?.email}
	</h1>
	<Button on:click={() => signOut()}>Logout</Button>
</div>
