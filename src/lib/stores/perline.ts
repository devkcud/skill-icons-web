import { writable, type Writable } from 'svelte/store';

import { storageName } from '$lib/utils/config';
import LocalStorage from '$lib/utils/localstorage';

const { PERLINE } = storageName;
const storage = new LocalStorage(PERLINE.name);

/**
 * The perline store that holds the current 'per line' configuration value.
 * It's a writable Svelte store that initially holds a default value defined in the configuration.
 */
export const perline: Writable<number> = writable<number>(PERLINE.defaultValue);

/**
 * Updates the 'per line' configuration value.
 * It enforces boundaries on the input amount, ensuring it falls between 1 and 50, defaulting to 15 if the input is not a number.
 * The new value is both saved to the perline store and persisted in local storage.
 *
 * @param {number} amount - The new 'per line' value to be set, must be a number. **MIN: 1 | MAX: 50**
 */
export function setPerline(amount: number): void {
  if (isNaN(amount)) amount = 15;
  if (amount < 1) amount = 1;
  if (amount > 50) amount = 50;

  perline.set(Number(amount));
  storage.set(String(amount));
}
