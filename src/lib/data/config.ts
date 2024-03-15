import type { Theme } from '$lib/stores/theme';

export const storageName = {
  ICONS: {
    name: 'icons',
    defaultValue: [] as string[]
  },
  PERLINE: {
    name: 'perline',
    defaultValue: 15
  },
  THEME: {
    name: 'theme',
    defaultValue: 'dark' as Theme
  }
};
