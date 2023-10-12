<script>
	import Seo from "$lib/components/seo.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import interviewees from "$lib/data/interviewees.json";

	let keyword = "";
</script>

<Seo
	title="WRI Open Recruitment"
	desc="An app that should help WRI Open Recruitment process since using Google Sheet and Google Form was such a painful experience"
	keywords={["wri", "open", "recruitment", "oprec", "wridev", "wri", "dev"]}
/>

<div class="max-w-screen-sm p-8 mx-auto">
	<Card class="flex flex-col gap-4 p-4">
		<h1 class="font-bold text-2xl text-slate-800 text-center">Daftar Peserta Open Recruitment</h1>
		<Input placeholder="Type your name here..." bind:value={keyword} />
	</Card>
	<div class="flex flex-col gap-2 py-4">
		{#each interviewees
			.sort()
			.filter((interviewee) => new RegExp(keyword, "gi").test(interviewee)) as interviewee (interviewee)}
			<Card class="p-4 capitalize">
				{interviewee}
			</Card>
		{/each}
	</div>
</div>
