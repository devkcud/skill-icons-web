import { toast } from '@zerodevx/svelte-toast';
import { writable, type Writable } from 'svelte/store';

import { toTitle } from '$lib/utils/string';

import { storageName } from '$lib/utils/config';
import LocalStorage from '$lib/utils/localstorage';

const storage = new LocalStorage(storageName.THEME.name);

/**
 * A type that is either light or dark.
 */
export type Theme = 'light' | 'dark';
/**
 * A `Writable` Svelte store that holds the current theme value. This store can
 * contain either 'light' or 'dark' as its value. The initial value of the theme
 * is obtained from a configuration's default value, and cast to the `Theme` type.
 */
export const theme: Writable<Theme> = writable<Theme>(storageName.THEME.defaultValue as Theme);

/**
 * Toggles the current theme state between light and dark modes.
 * This function does not return any value. Upon toggling the theme,
 * it will update the `theme` store, show a toast message indicating the new theme,
 * and save the setting in local storage.
 */
export function toggleTheme(): void {
  theme.update((currentTheme) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    toast.push(`Toggled Mode: ${toTitle(newTheme)}`);
    storage.set(newTheme);
    return newTheme;
  });
}
