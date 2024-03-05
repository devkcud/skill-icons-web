<script lang="ts">
  import 'iconify-icon';
  import { toast } from '@zerodevx/svelte-toast';
  import SkillIcon from '$lib/components/SkillIcon.svelte';
  import data from '$lib/data/icons.json';
  import ConfirmationToast from '$lib/components/ConfirmationToast.svelte';
  import { dataFilter, copyToClipboard } from '$lib/utils';
  import { onDestroy, onMount } from 'svelte';
  import Sortable from 'sortablejs';

  export const prerender = true;

  let search = '';
  $: filteredIcons = dataFilter(data, icons, search);

  let icons: string[] = [];
  let lightMode: boolean = false;
  let quantityPerRow: number = 5;

  $: url = {
    base: 'https://skillicons.dev/icons',
    icons: `?i=${icons.join(',')}`,
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
        get: (): string[] => icons,
        set: (sortable: Sortable) => (icons = sortable.toArray())
      }
    });
  });

  onDestroy(() => {
    if (sortable) {
      sortable.destroy();
    }
  });

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

  function clearIcons(event: MouseEvent) {
    if (event.shiftKey) {
      icons = [];
      toast.push('FORCE: Cleared all icons');
      return;
    }

    toast.push({
      component: {
        src: ConfirmationToast,
        props: {
          message: 'Clear all icons?',
          onAccept: () => {
            icons = [];
            toast.push('Cleared all icons');
          },
          onDeny: () => {
            toast.push('Cancelled clearing icons');
          }
        },
        sendIdTo: 'toastId'
      },
      dismissable: false,
      initial: 0
    });
  }
</script>

<svelte:head>
  <title>Skill Icons - Image Builder</title>
</svelte:head>

<section class="flex flex-col items-center gap-4">
  <h1 class="text-3xl font-bold">Preview</h1>

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
    {#each icons as id (id)}
      <SkillIcon data-id={id} {id} {lightMode} onClick={() => toggleIcon(id)} />
    {/each}
  </div>

  {#if !icons.length}
    <p class="text-neutral/70 italic text-center mb-4">No icons selected.</p>
  {/if}

  <div class="flex gap-2 items-center">
    <button class="btn btn-sm" on:click={() => copyToClipboard(icons, fullUrl)}>
      <iconify-icon icon="lucide:clipboard-copy" class="text-neutral text-xl" />
      Copy URL
    </button>

    <button class="btn btn-sm" on:click={() => copyToClipboard(icons, markdown)}>
      <iconify-icon icon="material-symbols:markdown" class="text-neutral text-xl" />
      Copy Markdown
    </button>

    <button class="btn btn-sm" on:click={() => copyToClipboard(icons, html)}>
      <iconify-icon icon="material-symbols:code" class="text-neutral text-xl" />
      Copy HTML
    </button>
  </div>
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
      <SkillIcon {id} {lightMode} onClick={() => toggleIcon(id)} />
    {:else}
      <p class="text-neutral/70 italic w-full text-center">0 icons found.</p>
    {/each}
  </div>
</section>
