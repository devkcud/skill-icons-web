import { writable, type Writable } from 'svelte/store';
import { toast } from '@zerodevx/svelte-toast';
import ConfirmationToast from '$lib/components/ConfirmationToast.svelte';
import data from '$lib/data/icons.json';
import LocalStorage from './localstorage';

type Data = Record<string, { name: string; aliases: string[] }>;

export const allIconsData: Data = data;
export const icons: Writable<string[]> = writable<string[]>([]);

export function addIcon(id: string): void {
  icons.update((currentIcons: string[]) => {
    LocalStorage.set('icons', JSON.stringify([...currentIcons, id]));
    return [...currentIcons, id];
  });

  toast.push(`Added: ${allIconsData[id].name}`);
}

export function removeIcon(id: string): void {
  icons.update((currentIcons: string[]) => {
    LocalStorage.set('icons', JSON.stringify(currentIcons.filter((i) => i !== id)));
    return currentIcons.filter((i) => i !== id);
  });
  toast.push(`Removed: ${allIconsData[id].name}`);
}

export function clearIcons(event: MouseEvent): void {
  if (event.shiftKey) {
    icons.set([]);
    LocalStorage.remove('icons');
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
          LocalStorage.remove('icons');
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

export function clipboard(text: string) {
  const unsubscribe = icons.subscribe(() => {
    if (navigator.clipboard === undefined) {
      const textarea = document.createElement('textarea');
      textarea.value = text;

      document.body.append(textarea);

      textarea.select();

      try {
        // WARNING: Usage of deprecated function
        document.execCommand('copy');
      } catch (err) {
        toast.push('Could not copy to clipboard: Browser does not support', {
          theme: { '--toastColor': 'red', '--toastBarBackground': 'red' }
        });
      }

      textarea.blur();
      textarea.remove();
    } else {
      navigator.clipboard.writeText(text);
    }

    toast.push('Copied to clipboard');
  });

  unsubscribe();
}
