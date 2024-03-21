<script lang="ts">
  import 'iconify-icon';
  import '../app.css';

  import { SvelteToast } from '@zerodevx/svelte-toast';

  const options = {
    theme: {
      '--toastBackground': '#1A202C',
      '--toastBarBackground': '#718096'
    },
    duration: 700
  };
</script>

<svelte:head>
  <title>Skill Icons - Image Builder</title>
</svelte:head>

<SvelteToast {options} />

<header class="flex flex-col items-center justify-center p-8">
  <img src="/skillicons.svg" alt="Skill Icons logo" class="max-h-16" />
  <p class="mt-3 text-xl font-semibold text-center">
    Showcase your skills on your GitHub or resumé with ease!
  </p>
</header>

<main>
  <slot />
</main>

<footer class="flex justify-center gap-2 py-8">
  <a
    class="transition opacity-70 hover:opacity-100"
    href="https://github.com/devkcud/skill-icons-web"
    target="_blank"
    rel="noreferrer"
  >
    <iconify-icon icon="mdi:github" width="24" height="24" />
  </a>

  <a
    class="transition opacity-70 hover:opacity-100"
    href="https://skillicons.dev"
    target="_blank"
    rel="noreferrer"
  >
    <iconify-icon icon="ant-design:project-filled" width="24" height="24" />
  </a>
</footer>
