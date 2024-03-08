import { toast } from '@zerodevx/svelte-toast';
import { writable, type Writable } from 'svelte/store';
import LocalStorage from '../utils/localstorage';

export type Theme = 'light' | 'dark';
export const theme: Writable<Theme> = writable<Theme>('dark');

export function toggleTheme(): void {
  theme.update((currentTheme) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    toast.push(`Toggled Mode: ${newTheme}`);
    LocalStorage.set('theme', newTheme);
    return newTheme;
  });
}
