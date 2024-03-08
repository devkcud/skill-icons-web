import { toast } from '@zerodevx/svelte-toast';
import { writable, type Writable } from 'svelte/store';
import LocalStorage from '../utils/localstorage';
import { storageName } from '$lib/data/config';
import { toTitle } from '$lib/utils/string';

const storage = new LocalStorage(storageName.THEME.name);

export type Theme = 'light' | 'dark';
export const theme: Writable<Theme> = writable<Theme>(storageName.THEME.defaultValue as Theme);

export function toggleTheme(): void {
  theme.update((currentTheme) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    toast.push(`Toggled Mode: ${toTitle(newTheme)}`);
    storage.set(newTheme);
    return newTheme;
  });
}
