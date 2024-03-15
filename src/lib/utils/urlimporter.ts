import z from 'zod';
import { storageName } from '$lib/data/config';
import { existIcon, icons } from '$lib/stores/icons';
import { perline } from '$lib/stores/perline';
import { theme, type Theme } from '$lib/stores/theme';
import LocalStorage from './localstorage';
import { toast } from '@zerodevx/svelte-toast';

const iconsStorage = new LocalStorage(storageName.ICONS.name);
const themeStorage = new LocalStorage(storageName.THEME.name);
const perlineStorage = new LocalStorage(storageName.PERLINE.name);

type URLProps = {
  iconsParam: string | null;
  themeParam: Theme | null;
  perlineParam: number | null;
};

function extractParams(url: string): URLProps {
  url = url.replace('https://skillicons.dev/icons', '');
  const urlParams = new URLSearchParams(url);

  const urlPropsConstructor = z.object({
    iconsParam: z.string().or(z.null()),
    themeParam: z.custom<Theme>().or(z.null()),
    perlineParam: z.coerce.number().or(z.null())
  });

  return urlPropsConstructor.parse({
    iconsParam: urlParams.get('i'),
    themeParam: urlParams.get('theme'),
    perlineParam: urlParams.get('perline')
  });
}

export function loadFromURL(url: string): void {
  const { iconsParam, themeParam, perlineParam } = extractParams(url);

  icons.set(
    iconsParam !== null
      ? iconsParam.split(',').filter((i) => existIcon(i))
      : storageName.ICONS.defaultValue
  );
  theme.set(themeParam ?? storageName.THEME.defaultValue);
  perline.set(perlineParam ?? storageName.PERLINE.defaultValue);

  icons.subscribe((value) => iconsStorage.set(JSON.stringify(value)))();
  theme.subscribe((value) => themeStorage.set(value))();
  perline.subscribe((value) => perlineStorage.set(JSON.stringify(value)))();

  toast.push('Loaded from URL');
}
