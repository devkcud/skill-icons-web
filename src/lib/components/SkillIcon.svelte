<script lang="ts">
  import darkmodeonly from '$lib/data/darkmode-only.json';
  import { iconsData } from '$lib/stores/icons';
  import type { Theme } from '$lib/stores/theme';
  import { toTitle } from '$lib/utils/string';

  /**
   * The icon's identifier found in `icons.json`.
   */
  export let id: string;
  /**
   * Indicates the theme as light or dark.
   */
  export let theme: Theme;
  /**
   * Function to handle click events.
   *
   * @param {...unknown[]} args - Arguments received by the click event handler.
   */
  export let onclick: (...args: unknown[]) => void;

  const name = iconsData[id].name;

  // HACK: In the original repo, the ScikitLearn icon is named like this: SciKitLearn-Light.svg or ScikitLearn-Dark.svg
  // The 'K' in 'kit' changes from 'K' to 'k' depending on the theme
  $: iconName = (function () {
    if (darkmodeonly.includes(name)) {
      return `${name}.svg`;
    }

    let titleTheme = toTitle(theme);

    if (name === 'ScikitLearn') {
      return `${theme === 'light' ? `SciKitLearn-${titleTheme}` : `ScikitLearn-${titleTheme}`}.svg`;
    }

    return `${name}-${titleTheme}.svg`;
  })();
</script>

<div
  class="tooltip max-w-12 max-h-12 hover:scale-110 transition-transform"
  data-tip={name}
  {...$$restProps}
>
  <button on:click={onclick}>
    <img src={`/skill-icons/icons/${iconName}`} alt={name} loading="lazy" />
  </button>
</div>
