<script lang="ts">
  import 'iconify-icon';
  import { toast } from '@zerodevx/svelte-toast';
  import { twMerge } from 'tailwind-merge';
  import data from '../lib/icons.json';
  import blacklist from '../lib/blacklist-lightmode.json';

  type IconData = {
    name: string;
    aliases?: string[];
  };

  let search = '';
  $: filteredIcons = Object.entries(data)
    .filter(([key, value]) =>
      search === ''
        ? true
        : key.toLowerCase().includes(search.toLowerCase()) ||
          (value as IconData).name.toLowerCase().includes(search.toLowerCase()) ||
          (value as IconData).aliases?.some((alias) =>
            alias.toLowerCase().includes(search.toLowerCase())
          )
    )
    .map(([key, value]) => [key, (value as IconData).name]);

  let icons: string[] = []; // Placeholder
  let lightMode: boolean = false;
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

<input type="text" bind:value={search} placeholder="Search by name" class="block mx-auto input input-bordered input-sm w-full max-w-xs" />

<div class="flex flex-wrap justify-center gap-4 m-4">
  {#each filteredIcons as [entry, name]}
    <img
      src={`https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/${name}${!blacklist.includes(name) ? '-Dark' : ''}.svg`}
      alt={name}
      class={twMerge(
        'size-12',
        icons.includes(entry) ? 'rounded-[10px] ring-[8px] ring-offset-2 ring-red-500' : ''
      )}
    />
  {/each}
</div>

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
