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
 * @param {unknown} amount - The new 'per line' value to be set. **MIN: 1 | MAX: 50**
 */
export function setPerline(amount: unknown): void {
  let sanitizedAmount = sanitizePerline(amount);

  perline.set(sanitizedAmount);
  storage.set(String(sanitizedAmount));
}

export function sanitizePerline(amount: unknown): number {
  let sanitizedAmount = parseInt(String(amount).trim(), 10);

  if (isNaN(sanitizedAmount)) sanitizedAmount = 15;
  if (sanitizedAmount < 1) sanitizedAmount = 1;
  if (sanitizedAmount > 50) sanitizedAmount = 50;

  return sanitizedAmount;
}
