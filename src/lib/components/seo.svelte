<svelte:head>
	<title>{title} | {siteName}</title>
	<link rel="canonical" href="{siteUrl}{$page.url.pathname}" />
	<meta name="description" content={desc} />
	<meta name="keywords" content={keywords.join(",").toLowerCase()} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{siteUrl}{$page.url.pathname}" />
	<meta property="og:title" content={title || siteName} />
	<meta property="og:description" content={desc} />

	<!-- Twitter -->
	<meta property="twitter:card" content={thumbnail ? "summary_large_image" : "summary"} />
	<meta property="twitter:url" content="{siteUrl}{$page.url.pathname}" />
	<meta property="twitter:title" content={title || siteName} />
	<meta property="twitter:description" content={desc} />
</svelte:head>

<script lang="ts">
import { page } from "$app/stores";

export let title: string;
export let thumbnail: string | boolean = false;
export let desc: string;
export let keywords: string[];

const siteUrl = "http://oprec.wridev.id";
const siteName = "WRI Open Recruitment";
</script>
