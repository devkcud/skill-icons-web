import { writable, type Writable } from 'svelte/store';
import LocalStorage from '../utils/localstorage';
import { storageName } from '$lib/data/config';

const { PERLINE } = storageName;
const storage = new LocalStorage(PERLINE.name);

export const perline: Writable<number> = writable<number>(PERLINE.defaultValue);

export function setPerline(amount: number): void {
  if (isNaN(amount)) amount = 15;
  if (amount < 1) amount = 1;
  if (amount > 50) amount = 50;

  perline.set(amount);
  storage.set(String(amount));
}
