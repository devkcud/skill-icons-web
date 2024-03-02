<script lang="ts">
  import 'iconify-icon';
  import { toast } from '@zerodevx/svelte-toast';
  import { twMerge } from 'tailwind-merge';
  import data from '$lib/data/icons.json';
  import blacklist from '$lib/data/blacklist-lightmode.json';

  type IconData = {
    name: string;
    aliases?: string[];
  };

  const allIcons: { [key: string]: IconData } = data;

  const githubUrl = 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/';

  let search = '';
  $: filteredIcons = Object.entries(allIcons)
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

  let icons: string[] = [];
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

  function toggleIcon(icon: string) {
    if (icons.includes(icon)) {
      icons = icons.filter((i) => i !== icon);
    } else {
      icons = [...icons, icon];
    }
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

  <div class="h-12 flex items-center">
    {#if icons.length !== 0}
      <div class="flex gap-2">
        {#each icons as icon}
          <div class="tooltip" data-tip={allIcons[icon].name}>
            <button on:click={() => toggleIcon(icon)}>
              <img
                src={`${githubUrl}${allIcons[icon].name}${
                  !blacklist.includes(allIcons[icon].name) ? (lightMode ? '-Light' : '-Dark') : ''
                }.svg`}
                alt={allIcons[icon].name}
                class="size-12"
              />
            </button>
          </div>
        {/each}
      </div>
    {:else}
      <p class="text-center">Click the icons below to add to the stack.</p>
    {/if}
  </div>

  <div class="flex gap-2 items-center">
    <span class="font-mono text-sm text-gray-500 bg-gray-200 p-2">{formatUrl(false)}</span>
    <button on:click={copyToClipboard}>
      <iconify-icon icon="lucide:clipboard-copy" class="text-neutral" />
    </button>
  </div>
</div>

<input
  type="text"
  bind:value={search}
  placeholder="Search by name"
  class="block mx-auto input input-bordered input-sm w-full max-w-xs mt-8"
/>

<div class="flex flex-wrap justify-center gap-4 m-4">
  {#each filteredIcons as [entry, name]}
    <div class="tooltip" data-tip={name}>
      <button on:click={() => toggleIcon(entry)}>
        <img
          src={`${githubUrl}${name}${!blacklist.includes(name) ? '-Dark' : ''}.svg`}
          alt={name}
          class={twMerge(
            'size-12',
            icons.includes(entry) ? 'rounded-[10px] ring-[8px] ring-offset-2 ring-red-500' : ''
          )}
        />
      </button>
    </div>
  {/each}
</div>
