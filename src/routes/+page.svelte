<script lang="ts">
  import 'iconify-icon';
  import { toast } from '@zerodevx/svelte-toast';

  let icons = ['aws', 'gcp', 'azure', 'react', 'vue', 'flutter']; // Placeholder
  let lightMode = false;
  $: url = {
    base: 'https://skillicons.dev/icons',
    icons: `?i=${icons.join(',')}`,
    mode: '&theme=' + (lightMode ? 'light' : 'dark')
  };

  $: formatUrl = (showIcons = true) => {
    return url.base + (showIcons ? url.icons : '?i=...') + url.mode;
  };

  function toggleMode() {
    lightMode = !lightMode;

    toast.push('Toggled Mode: ' + (lightMode ? 'Light' : 'Dark'));
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(formatUrl());

    toast.push('Copied to clipboard');
  }
</script>

<svelte:head>
  <title>Skill Icons - Image Builder</title>
</svelte:head>

<div class="flex flex-col items-center gap-4">
  <button on:click={toggleMode} class="btn btn-sm btn-ghost">
    {#if lightMode}
      <iconify-icon icon="lucide:sun" />
    {:else}
      <iconify-icon icon="lucide:moon" />
    {/if}
    {lightMode ? 'Light' : 'Dark'}
  </button>

  <img src={formatUrl()} alt="Skill Icons" class="h-12" />
  <div class="flex gap-2 items-center">
    <span class="font-mono text-sm text-gray-500 bg-gray-200 p-2">{formatUrl(false)}</span>
    <button on:click={copyToClipboard}>
      <iconify-icon icon="lucide:clipboard-copy" class="text-neutral" />
    </button>
  </div>
</div>
