<script lang="ts">
  import 'iconify-icon';
  import { toast } from '@zerodevx/svelte-toast';
  import SkillIcon from '$lib/components/SkillIcon.svelte';
  import data from '$lib/data/icons.json';
  import ConfirmationToast from '$lib/components/ConfirmationToast.svelte';

  let search = '';
  $: filteredIcons = Object.entries(data)
    .filter(function ([key, value]) {
      return (
        !icons.includes(key) &&
        (key.toLowerCase().includes(search.toLowerCase()) ||
          value.name.toLowerCase().includes(search.toLowerCase()) ||
          value.aliases?.some((alias) => alias.toLowerCase().includes(search.toLowerCase())))
      );
    })
    .map(function ([key]) {
      return key;
    });

  let icons: string[] = [];
  let lightMode: boolean = false;
  let showFullUrl: boolean = false;

  $: url = {
    base: 'https://skillicons.dev/icons',
    icons: `?i=${icons.join(',')}`,
    mode: '&theme=' + (lightMode ? 'light' : 'dark')
  };

  $: formatUrl = (showIcons = true) => {
    return url.base + (showIcons ? url.icons : '?i=...') + url.mode;
  };

  function copyToClipboard() {
    if (icons.length === 0) {
      toast.push('No icons selected', {
        theme: { '--toastColor': 'red', '--toastBarBackground': 'red' }
      });
      return;
    }

    if (navigator.clipboard === undefined) {
      // FIXME: Kinda hacky but it works for now
      // Sometime later I'll do it properly
      // im just tired rn so thatll do for now

      // @ts-ignore
      const textarea = document.createElement('textarea');
      textarea.value = formatUrl();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } else {
      navigator.clipboard.writeText(formatUrl());
    }

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

  function toggleMode() {
    lightMode = !lightMode;

    toast.push('Toggled Mode: ' + (lightMode ? 'Light' : 'Dark'));
  }

  function clearIcons() {
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
  </div>

  <div class="flex items-center">
    {#if icons.length !== 0}
      <div class="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-2 px-4">
        {#each icons as id (id)}
          <SkillIcon {id} {lightMode} onClick={() => toggleIcon(id)} />
        {/each}
      </div>
    {:else}
      <p class="text-center">Click the icons below to add to the stack.</p>
    {/if}
  </div>

  {#if icons.length !== 0}
    <div class="flex gap-2 items-center">
      <button class="btn btn-xs font-mono text-sm" on:click={() => (showFullUrl = !showFullUrl)}>
        {formatUrl(showFullUrl)}
      </button>
      <button on:click={copyToClipboard}>
        <iconify-icon icon="lucide:clipboard-copy" class="text-neutral text-xl" />
      </button>
    </div>
  {/if}
</section>

<section>
  <div class="flex items-center justify-center mt-8 gap-2">
    <label class="flex items-center gap-2 input input-bordered input-sm">
      <iconify-icon icon="lucide:search" class="opacity-70" />
      <input type="text" bind:value={search} placeholder="Search by name" />
    </label>
  </div>

  <div class="flex flex-wrap justify-center gap-4 p-4 max-w-7xl mx-auto">
    {#each filteredIcons as id (id)}
      <SkillIcon {id} {lightMode} onClick={() => toggleIcon(id)} />
    {/each}
  </div>
</section>
