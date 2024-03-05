<script lang="ts">
  import 'iconify-icon';
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import '../app.css';

  const options = {
    theme: {
      '--toastBackground': '#1A202C',
      '--toastBarBackground': '#718096'
    },
    duration: 2000
  };
</script>

<SvelteToast {options} />

<header class="p-8 flex flex-col justify-center items-center">
  <img src="/skillicons.svg" alt="Skill Icons logo" class="max-h-16" />
  <p class="text-center font-semibold text-xl mt-3">
    Showcase your skills on your GitHub or resumé with ease!
  </p>
</header>

<main>
  <slot />
</main>

<footer class="flex justify-center gap-2 py-8">
  <a
    class="transition opacity-70 hover:opacity-100"
    href="https://github.com/tandpfun/skill-icons"
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
