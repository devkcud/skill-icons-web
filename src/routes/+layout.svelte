<script lang="ts">
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

<div>
  <slot />
</div>
