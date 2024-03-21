<script lang="ts">
  /**
   * Almost all the colors provided by Daisy UI.
   */
  type Color = 'primary' | 'secondary' | 'neutral' | 'info' | 'success' | 'warning' | 'error';

  /**
   * Represents the icon's name for dynamic rendering.
   * Fetches the icon from Iconify website.
   */
  export let icon: string = '';
  /**
   * Represents the color theme of the component from predefined options.
   */
  export let color: Color = 'secondary';
  /**
   * Function to be invoked upon user interaction, specifically a click event.
   */
  export let onclick: (e?: MouseEvent) => void;
</script>

<button
  class="btn btn-sm"
  class:btn-primary={color === 'primary'}
  class:btn-secondary={color === 'secondary'}
  class:btn-neutral={color === 'neutral'}
  class:btn-info={color === 'info'}
  class:btn-success={color === 'success'}
  class:btn-warning={color === 'warning'}
  class:btn-error={color === 'error'}
  on:click={onclick}
>
  {#if icon !== ''}
    <iconify-icon {icon} />
  {/if}

  <slot />
</button>
