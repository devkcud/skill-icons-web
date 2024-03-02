<script lang="ts">
  import 'iconify-icon';
  import { toast } from '@zerodevx/svelte-toast';
  import SkillIcon from '$lib/components/SkillIcon.svelte';
  import data from '$lib/data/icons.json';

  let search = '';
  $: filteredIcons = Object.entries(data)
    .filter(function ([key, value]) {
      if (search === '') {
        return true;
      }

      return (
        key.toLowerCase().includes(search.toLowerCase()) ||
        value.name.toLowerCase().includes(search.toLowerCase()) ||
        value.aliases?.some((alias) => alias.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .map(function ([key]) {
      return key;
    });

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
    // @ts-ignore
    const name = data[icon].name;

    if (icons.includes(icon)) {
      icons = icons.filter((i) => i !== icon);
      toast.push(`Removed: ${name}`);
    } else {
      icons = [...icons, icon];
      toast.push(`Added: ${name}`);
    }
  }
</script>

<svelte:head>
  <title>Skill Icons - Image Builder</title>
</svelte:head>

<section class="flex flex-col items-center gap-4">
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
        {#each icons as id (id)}
          <SkillIcon {id} {lightMode} onClick={() => toggleIcon(id)} />
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
</section>

<section>
  <div class="flex items-center justify-center mt-8 gap-2">
    <input
      type="text"
      bind:value={search}
      placeholder="Search by name"
      class="input input-bordered input-sm"
    />
  </div>

  <div class="flex flex-wrap justify-center gap-4 p-4 max-w-7xl mx-auto">
    {#each filteredIcons as id (id)}
      <SkillIcon {id} {lightMode} onClick={() => toggleIcon(id)} />
    {/each}
  </div>
</section>
