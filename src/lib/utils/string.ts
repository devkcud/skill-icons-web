import { toast } from '@zerodevx/svelte-toast';

export function toTitle(word: string): string {
  return word.replace(/(\w)(\w*)/g, (_, c, w) => `${c.toUpperCase()}${w.toLowerCase()}`);
}

export function clipboard(text: string): void {
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
}
