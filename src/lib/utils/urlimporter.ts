import { toast } from '@zerodevx/svelte-toast';
import z from 'zod';

import { existIcon, icons } from '$lib/stores/icons';
import { perline } from '$lib/stores/perline';
import { theme, type Theme } from '$lib/stores/theme';

import { storageName } from '$lib/utils/config';
import LocalStorage from '$lib/utils/localstorage';

const iconsStorage = new LocalStorage(storageName.ICONS.name);
const themeStorage = new LocalStorage(storageName.THEME.name);
const perlineStorage = new LocalStorage(storageName.PERLINE.name);

/**
 * Type definition for URL parameters used to configure app settings.
 */
type URLProps = {
  /**
   * Parameter representing icon settings, possibly null.
   */
  iconsParam: string | null;
  /**
   * Theme parameter as defined in the Theme type, possibly null.
   */
  themeParam: Theme | null;
  /**
   * Parameter determining the number of icons per line, possibly null.
   */
  perlineParam: number | null;
};

/**
 * Extracts specific parameters from a provided URL string to configure app settings.
 *
 * This function takes a URL, strips out a predefined base path to leaving only the query string,
 * and then uses URLSearchParams to parse this query string into individual parameters.
 * These parameters are then validated and possibly coerced into specific types
 * using Zod schema validation, creating a structured object that conforms to the URLProps type.
 *
 * @param {string} url - The full URL string from which to extract settings parameters.
 * @returns {URLProps} An object containing the extracted and typed values for iconsParam, themeParam, and perlineParam.
 */
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

/**
 * Loads settings from a URL string and updates app states accordingly.
 *
 * This function parses a given URL to extract parameters for icons, theme,
 * and items per line, and then updates their corresponding app states.
 * If parameters are missing in the URL, it falls back to default values.
 * Subsequently, it subscribes to changes in these states to update local storage
 * and displays a toast message upon successful load.
 *
 * @param {string} url - The URL string from which to extract the settings.
 */
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
