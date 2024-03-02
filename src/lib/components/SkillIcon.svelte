<script lang="ts">
  import blacklist from '$lib/data/blacklist-lightmode.json';
  import data from '$lib/data/icons.json';

  export let id: string;
  export let lightMode: boolean;
  export let onClick: (...args: any) => void;

  const githubUrl = 'https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/';

  // @ts-ignore
  $: name = data[id].name;
  $: theme = !blacklist.includes(name) ? (lightMode ? '-Light' : '-Dark') : '';
  // NOTE: This is a hacky way to get the icon name correctly
  // In the original repo, the ScikitLearn icon is named like this: SciKitLearn-Light.svg or ScikitLearn-Dark.svg
  // You might not see the diference, but the 'K' in 'kit' changes from 'K' to 'k' depending on the theme
  $: iconName = (function () {
    if (name === 'ScikitLearn') {
      return theme === '-Light' ? 'SciKitLearn-Light.svg' : 'ScikitLearn-Dark.svg';
    }

    return `${name}${theme}.svg`;
  })();
  //$: iconName = `${name}${theme}.svg`; // If we lived in a perfect world
</script>

<div class="tooltip size-12" data-tip={name}>
  <button on:click={onClick}>
    <img src={`${githubUrl}${iconName}`} alt={name} class="size-12" loading="lazy" />
  </button>
</div>
