import { writable, type Writable } from 'svelte/store';
import LocalStorage from '../utils/localstorage';

export const perline: Writable<number> = writable<number>(15);

export function setPerline(amount: number): void {
  __setClamp(amount);
  __updateStorage(amount);
}

function __updateStorage(pw: number): void {
  LocalStorage.set('perline', String(pw));
}

function __setClamp(amount: number): void {
  if (isNaN(amount)) amount = 15;
  if (amount < 1) amount = 1;
  if (amount > 50) amount = 20;
  perline.set(amount);
}
