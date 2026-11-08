<script lang="ts">
  import 'iconify-icon';
  import '../app.css';

  import { SvelteToast } from '@zerodevx/svelte-toast';
  import { site } from '$lib/seo';

  const options = {
    theme: {
      '--toastBackground': '#1A202C',
      '--toastBarBackground': '#718096'
    },
    duration: 700
  };
</script>

<svelte:head>
  <title>{site.name}</title>
</svelte:head>

<SvelteToast {options} />

<main>
  <slot />
</main>

<footer class="flex flex-wrap justify-center gap-4 px-4 py-8 text-sm">
  <a
    class="flex items-center gap-2 transition opacity-70 hover:opacity-100"
    href="https://github.com/devkcud/skill-icons-web"
    target="_blank"
    rel="noreferrer"
    aria-label="Source on GitHub"
  >
    <iconify-icon icon="mdi:github" width="24" height="24" aria-hidden="true" />
  </a>

  <a
    class="flex items-center gap-2 transition opacity-70 hover:opacity-100"
    href="https://skillicons.dev"
    target="_blank"
    rel="noreferrer"
    aria-label="Original Skill Icons"
  >
    <img src="/favicon.png" alt="Skill Icons logo" class="size-5 grayscale" aria-hidden="true" />
  </a>
</footer>
