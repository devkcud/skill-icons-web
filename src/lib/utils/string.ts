import { toast } from '@zerodevx/svelte-toast';

/**
 * Converts a given word to title case, making the first letter of each word uppercase and the rest lowercase.
 *
 * @param {string} word - The word to convert to title case.
 * @returns {string} - The converted word in title case.
 */
export function toTitle(word: string): string {
  return word.replace(/(\w)(\w*)/g, (_, c, w) => `${c.toUpperCase()}${w.toLowerCase()}`);
}

/**
 * Copies the given text to the clipboard. It attempts to use the modern clipboard API; if not available,
 * it falls back to a deprecated method. Additionally, it notifies the user whether the copy operation was successful or not.
 *
 * @param {string} text - The text to be copied to the clipboard.
 */
export function clipboard(text: string): void {
  if (navigator.clipboard === undefined) {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    document.body.append(textarea);

    textarea.select();

    try {
      // HACK: Usage of deprecated function
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
