import type { Theme } from '$lib/stores/theme';

/**
 * Configuration for the local storage details.
 */
export const storageName = {
  /**
   * Configuration for storing icons.
   */
  ICONS: {
    /**
     * Name identifier for the storage
     */
    name: 'icons',
    /**
     * The default value, an empty array of strings
     */
    defaultValue: new Array<string>()
  },
  /**
   * Configuration for the number of items per line.
   */
  PERLINE: {
    /**
     * Name identifier for the storage
     */
    name: 'perline',
    /**
     * The default value for items per line
     */
    defaultValue: 15
  },
  /**
   * Configuration for the theme setting.
   */
  THEME: {
    /**
     * Name identifier for the storage
     */
    name: 'theme',
    /**
     * The default theme value
     */
    defaultValue: 'dark' as Theme
  }
};
