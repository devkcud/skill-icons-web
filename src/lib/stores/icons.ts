import { toast } from '@zerodevx/svelte-toast';
import { writable } from 'svelte/store';

import { ConfirmationToast } from '$lib/components/mod';

import { storageName } from '$lib/utils/config';
import LocalStorage from '$lib/utils/localstorage';

import data from '$lib/data/icons.json';

const { ICONS } = storageName;
const storage = new LocalStorage(ICONS.name);

/**
 * The constant `allIconsData` holds the structured data for all icons, fetched
 * from a JSON file, where each key represents an icon's unique identifier and
 * its value is an object containing the icon's name and its aliases.
 */
export const iconsData: Record<string, { name: string; aliases: string[] }> = data;

/**
 * Writable store for icons with default value fetched from the ICONS configuration.
 * This store is primarily used to manage the list of icons within the application's local storage.
 */
export const icons = writable<string[]>(ICONS.defaultValue);

/**
 * Adds an icon to the store and updates the local storage.
 * Additionally, displays a toast notification with the icon name.
 *
 * @param {string} id - The ID of the icon to add.
 */
export function addIcon(id: string): void {
  icons.update((currentIcons: string[]) => {
    storage.set(JSON.stringify([...currentIcons, id]));
    return [...currentIcons, id];
  });

  toast.push(`Added: ${iconsData[id].name}`);
}

/**
 * Removes an icon from the store and updates the local storage.
 * Additionally, displays a toast notification with the removed icon's name.
 *
 * @param {string} id - The ID of the icon to remove.
 */
export function removeIcon(id: string): void {
  icons.update((currentIcons: string[]) => {
    storage.set(JSON.stringify(currentIcons.filter((i) => i !== id)));
    return currentIcons.filter((i) => i !== id);
  });

  toast.push(`Removed: ${iconsData[id].name}`);
}

/**
 * Clears all icons from the store and optionally handles a MouseEvent.
 * If the MouseEvent includes a shiftKey press, the icons are cleared immediately.
 * Otherwise, a confirmation toast is displayed asking for confirmation to clear all icons.
 *
 * @param {MouseEvent} [event] - Optional mouse event to check for shiftKey press.
 */
export function clearIcons(event?: MouseEvent): void {
  if (event?.shiftKey) {
    icons.set([]);
    storage.remove();
    toast.push('FORCE: Cleared all icons');
    return;
  }

  toast.push({
    component: {
      src: ConfirmationToast,
      props: {
        message: 'Clear all icons?',
        onAccept: () => {
          icons.set([]);
          storage.remove();
          toast.push('Cleared all icons');
        },
        onDeny: () => {
          toast.push('Cancelled clearing icons');
        }
      },
      sendIdTo: 'toastId'
    },
    dismissable: false,
    initial: 0
  });
}

/**
 * Sorts the icons stored in the local storage and updates the icons store.
 * After sorting, a toast notification is displayed.
 */
export function sortIcons() {
  icons.update((currentIcons) => {
    const sorted = currentIcons.sort();

    storage.set(JSON.stringify(sorted));
    return sorted;
  });

  toast.push('Sorted icons');
}

/**
 * Checks if an icon exists in the allIconsData object by its ID.
 *
 * @param {string} id - The ID of the icon to check.
 * @returns {boolean} True if the icon exists, false otherwise.
 */
export function existIcon(id: string): boolean {
  return iconsData[id] !== undefined;
}
