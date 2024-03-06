<script lang="ts">
  import 'iconify-icon';
  import { toast } from '@zerodevx/svelte-toast';
  import { onDestroy, onMount } from 'svelte';
  import Sortable from 'sortablejs';
  import SkillIcon from '$lib/components/SkillIcon.svelte';
  import {
    allIconsData,
    icons,
    clearIcons,
    addIcon,
    removeIcon,
    clipboard
  } from '$lib/stores/icons';

  let search = '';
  $: filteredIcons = Object.entries(allIconsData)
    .filter(([key, value]) => {
      return (
        !$icons.includes(key) &&
        (key.toLowerCase().includes(search.toLowerCase()) ||
          value.name.toLowerCase().includes(search.toLowerCase()) ||
          value.aliases.some((alias: string) => alias.toLowerCase().includes(search.toLowerCase())))
      );
    })
    .map(([key]) => key);

  let lightMode: boolean = false;
  let quantityPerRow: number = 15;

  $: url = {
    base: 'https://skillicons.dev/icons',
    icons: `?i=${$icons.join(',')}`,
    mode: '&theme=' + (lightMode ? 'light' : 'dark'),
    perline: `&perline=${quantityPerRow}`
  };

  $: fullUrl = url.base + url.icons + url.mode + url.perline;
  $: markdown = `![Skill Icons](${fullUrl})`;
  $: html = `<img src="${fullUrl}" alt="Skill Icons" />`;

  let sortable: Sortable;
  let list: HTMLElement;

  onMount(() => {
    sortable = Sortable.create(list, {
      animation: 100,
      store: {
        get: (): string[] => $icons,
        set: (sortable: Sortable) => icons.set(sortable.toArray())
      }
    });
  });

  onDestroy(() => {
    if (sortable) {
      sortable.destroy();
    }
  });

  function toggleMode() {
    lightMode = !lightMode;

    toast.push('Toggled Mode: ' + (lightMode ? 'Light' : 'Dark'));
  }

  function updatePerRow(method: '+' | '-') {
    let temp = eval(`${quantityPerRow} ${method} 1`);

    if (temp > 50) {
      temp = 50;
    } else if (temp < 1) {
      temp = 1;
    }

    quantityPerRow = temp;
  }

  function clampPerRow() {
    if (isNaN(quantityPerRow)) {
      quantityPerRow = 5;
      return;
    }

    let temp = quantityPerRow;

    if (temp > 50) {
      temp = 50;
    } else if (temp < 1) {
      temp = 1;
    }

    quantityPerRow = temp;
  }
</script>

<svelte:head>
  <title>Skill Icons - Image Builder</title>
</svelte:head>

<section class="flex flex-col items-center gap-4">
  <div class="flex gap-2">
    <button on:click={toggleMode} class="btn btn-sm btn-primary">
      {#if lightMode}
        <iconify-icon icon="lucide:sun" />
      {:else}
        <iconify-icon icon="lucide:moon" />
      {/if}
      {lightMode ? 'Light' : 'Dark'}
    </button>

    <button on:click={clearIcons} class="btn btn-sm btn-error">
      <iconify-icon icon="lucide:trash-2" />
      Clear
    </button>

    <div class="tooltip" data-tip="Quantity per row">
      <div>
        <button class="btn btn-sm" on:click={() => updatePerRow('-')}>-</button>
        <input
          class="input input-sm w-16 text-center"
          on:change={clampPerRow}
          bind:value={quantityPerRow}
        />
        <button class="btn btn-sm" on:click={() => updatePerRow('+')}>+</button>
      </div>
    </div>
  </div>

  <div
    bind:this={list}
    class="grid gap-2 px-4"
    style={`grid-template-columns: repeat(${quantityPerRow},minmax(0,1fr));`}
  >
    {#each $icons as id (id)}
      <SkillIcon data-id={id} {id} {lightMode} onClick={() => removeIcon(id)} />
    {/each}
  </div>

  {#if !$icons.length}
    <p class="text-neutral/70 italic text-center">No icons selected.</p>
  {:else}
    <div class="flex gap-2 items-center">
      <button class="btn btn-sm" on:click={() => clipboard(fullUrl)}>
        <iconify-icon icon="lucide:clipboard-copy" class="text-neutral text-xl" />
        Copy URL
      </button>

      <button class="btn btn-sm" on:click={() => clipboard(markdown)}>
        <iconify-icon icon="material-symbols:markdown" class="text-neutral text-xl" />
        Copy Markdown
      </button>

      <button class="btn btn-sm" on:click={() => clipboard(html)}>
        <iconify-icon icon="material-symbols:code" class="text-neutral text-xl" />
        Copy HTML
      </button>
    </div>
  {/if}
</section>

<div class="divider px-16 my-8"></div>

<section>
  <div class="flex items-center justify-center m-4 gap-2">
    <label class="flex items-center gap-2 input input-bordered input-sm">
      <iconify-icon icon="lucide:search" class="opacity-70" />
      <input type="text" bind:value={search} placeholder="Search by name" />
    </label>
  </div>

  <div class="flex flex-wrap gap-4 p-4 max-w-7xl mx-auto">
    {#each filteredIcons as id (id)}
      <SkillIcon {id} {lightMode} onClick={() => addIcon(id)} />
    {/each}
  </div>
</section>
