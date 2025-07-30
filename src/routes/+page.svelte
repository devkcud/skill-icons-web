<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast';
  import Sortable from 'sortablejs';
  import { onDestroy, onMount } from 'svelte';

  import { Button, Divider, SkillIcon, Tip } from '$lib/components/mod';

  import { addIcon, clearIcons, icons, iconsData, removeIcon, sortIcons } from '$lib/stores/icons';
  import { perline, setPerline } from '$lib/stores/perline';
  import { theme, toggleTheme, type Theme } from '$lib/stores/theme';

  import { storageName } from '$lib/utils/config';
  import LocalStorage from '$lib/utils/localstorage';

  import { clipboard, toTitle } from '$lib/utils/string';
  import { loadFromURL } from '$lib/utils/urlimporter';
  import ConfirmationToast from '$lib/components/ConfirmationToast.svelte';

  let importUrl: string = '';
  let search: string = '';

  $: filteredIcons = Object.entries(iconsData)
    .filter(
      ([key, value]) =>
        !$icons.includes(key) &&
        [key, ...value.aliases, value.name].some((name) =>
          name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    )
    .map(([name]) => name);

  $: url = {
    base: 'https://skillicons.dev/icons',
    icons: `?i=${$icons.join(',')}`,
    mode: `&theme=${$theme}`,
    perline: `&perline=${$perline}`
  };

  $: copyMountedURL = url.base + url.icons + url.mode + url.perline;
  $: copyMarkdown = `[![My Skills](${copyMountedURL})](https://skillicons.dev)`;
  $: copyHTML = `<a href="https://skillicons.dev"><img src="${copyMountedURL}" alt="My Skills" /></a>`;

  let sortable: Sortable;
  let list: HTMLElement;

  onMount(() => {
    const { ICONS, PERLINE, THEME } = storageName;

    $theme = (LocalStorage.get(THEME.name) || THEME.defaultValue) as Theme;
    $perline = Number(LocalStorage.get(PERLINE.name) || String(PERLINE.defaultValue));
    $icons = JSON.parse(LocalStorage.get(ICONS.name)!) || ICONS.defaultValue; // can't be ICONS.defaultValue cause it will just throw "empty string"

    sortable = Sortable.create(list, {
      animation: 100,
      store: {
        get: (): string[] => $icons,
        set: (sortable: Sortable) => {
          LocalStorage.set('icons', JSON.stringify(sortable.toArray()));
          icons.set(sortable.toArray());
        }
      }
    });
  });

  onDestroy(() => {
    if (sortable) {
      sortable.destroy();
    }
  });

  /**
   * Parses the provided URL and loads icons data from it. Resets import URL after loading.
   * The function checks if the provided URL is valid and non-empty, and if it follows the required scheme.
   * If not, it shows a toast message indicating an invalid URL and terminates.
   */
  function urlParse(): void {
    if (
      !importUrl ||
      importUrl.trim() === '' ||
      !importUrl.startsWith('https://skillicons.dev/icons?')
    ) {
      toast.push('Invalid URL');
      return;
    }

    loadFromURL(importUrl);
    importUrl = '';
  }

  /**
   * Resets configuration settings to their default values. Being gathered from `storageName` at `/lib/utils/config.ts`
   */
  function resetToDefault(event?: MouseEvent) {
    function reset() {
      $theme = storageName.THEME.defaultValue;
      $perline = storageName.PERLINE.defaultValue;
    }

    if (event?.shiftKey) {
      reset();
      toast.push('FORCE: Reset config to default');
      return;
    }

    toast.push({
      component: {
        src: ConfirmationToast,
        props: {
          message: 'Reset config to default?',
          onAccept: () => {
            reset();
            toast.push('Resetting...');
          },
          onDeny: () => {
            toast.push('Cancelled operation');
          }
        },
        sendIdTo: 'toastId'
      },
      dismissable: false,
      initial: 0
    });
  }
</script>

<div class="mx-auto space-y-4 w-fit">
  <div class="flex items-center gap-2 mx-auto">
    <input
      bind:value={importUrl}
      class="input input-bordered input-sm w-full"
      type="text"
      on:keydown={(e) => e.key === 'Enter' && urlParse()}
      placeholder="https://skillicons.dev/icons?i=...&theme=light&perline=10"
    />

    <Button onclick={urlParse} icon="mdi:import" color="primary">Import</Button>
  </div>

  <Tip>Paste the URL of your existing Skill Icons image, and click "Import".</Tip>
</div>

<div class="max-w-5xl mx-auto">
  <Divider />
</div>

<section class="flex flex-col items-center gap-4">
  <div class="space-x-2">
    <Button
      onclick={toggleTheme}
      color={$theme === 'light' ? 'secondary' : 'primary'}
      icon={$theme === 'light' ? 'lucide:sun' : 'lucide:moon'}
    >
      {toTitle($theme)}
    </Button>
    <Button onclick={sortIcons} icon="mdi:sort">Sort</Button>
    <Button onclick={clearIcons} color="error" icon="lucide:trash-2">Clear</Button>
    <Button onclick={resetToDefault} color="error" icon="fluent:arrow-reset-20-filled">Reset</Button
    >

    <div class="tooltip" data-tip="Icons per line">
      <Button onclick={() => setPerline($perline - 1)}>-</Button>

      <input
        class="w-16 text-center input input-sm"
        on:change={() => setPerline($perline)}
        bind:value={$perline}
      />

      <Button onclick={() => setPerline($perline + 1)}>+</Button>
    </div>
  </div>

  <div
    bind:this={list}
    class="grid gap-2"
    class:p-4={$icons.length > 0}
    style={`grid-template-columns: repeat(${$icons.length < $perline ? $icons.length : $perline},minmax(0,1fr));`}
  >
    {#each $icons as id (id)}
      <SkillIcon data-id={id} {id} theme={$theme} onclick={() => removeIcon(id)} />
    {/each}
  </div>

  {#if !$icons.length}
    <Tip>Click on the icons of the grid below to add them.</Tip>
  {:else}
    <div class="flex items-center gap-2">
      <Button onclick={() => clipboard(copyMountedURL)} icon="lucide:clipboard-copy">
        Copy Image URL
      </Button>
      <Button onclick={() => clipboard(copyMarkdown)} icon="material-symbols:markdown">
        Copy Markdown
      </Button>
      <Button onclick={() => clipboard(copyHTML)} icon="material-symbols:code">
        Copy HTML Code
      </Button>
    </div>

    <Tip>Drag icons to reorder.</Tip>
  {/if}
</section>

<div class="max-w-5xl mx-auto">
  <Divider />
</div>

<section>
  <div class="flex mx-auto w-fit items-center gap-2">
    <label class="flex items-center gap-2 cursor-text input input-bordered input-sm">
      <iconify-icon icon="lucide:search" class="opacity-70" />
      <input type="text" bind:value={search} class="w-full" placeholder="Search by name" />
    </label>

    <Button color="error" onclick={() => (search = '')}>
      <iconify-icon icon="gridicons:cross" />
    </Button>
  </div>

  <div class="flex flex-wrap justify-center gap-4 p-4 mx-auto max-w-7xl">
    {#each filteredIcons as id (id)}
      <SkillIcon {id} theme={$theme} onclick={() => addIcon(id)} />
    {/each}
  </div>
</section>
