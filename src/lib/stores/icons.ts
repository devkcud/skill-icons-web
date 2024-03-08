import { writable, type Writable } from 'svelte/store';
import { toast } from '@zerodevx/svelte-toast';
import ConfirmationToast from '$lib/components/ConfirmationToast.svelte';
import data from '$lib/data/icons.json';
import LocalStorage from '../utils/localstorage';
import { storageName } from '$lib/data/config';

const { ICONS } = storageName;
const storage = new LocalStorage(ICONS.name);

type Data = Record<string, { name: string; aliases: string[] }>;

export const allIconsData: Data = data;
export const icons: Writable<string[]> = writable<string[]>(ICONS.defaultValue);

export function addIcon(id: string): void {
  icons.update((currentIcons: string[]) => {
    storage.set(JSON.stringify([...currentIcons, id]));
    return [...currentIcons, id];
  });

  toast.push(`Added: ${allIconsData[id].name}`);
}

export function removeIcon(id: string): void {
  icons.update((currentIcons: string[]) => {
    storage.set(JSON.stringify(currentIcons.filter((i) => i !== id)));
    return currentIcons.filter((i) => i !== id);
  });
  toast.push(`Removed: ${allIconsData[id].name}`);
}

export function clearIcons(event: MouseEvent): void {
  if (event.shiftKey) {
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

export function sortIcons() {
  icons.update((currentIcons) => {
    storage.set(JSON.stringify(currentIcons.sort()));
    return currentIcons.sort();
  });

  toast.push('Sorted icons');
}
