import { toast } from '@zerodevx/svelte-toast';

export function dataFilter(data: Record<string, any>, icons: string[], search: string) {
  return Object.entries(data)
    .filter(function ([key, value]) {
      return (
        !icons.includes(key) &&
        (key.toLowerCase().includes(search.toLowerCase()) ||
          value.name.toLowerCase().includes(search.toLowerCase()) ||
          value.aliases?.some((alias: string) =>
            alias.toLowerCase().includes(search.toLowerCase())
          ))
      );
    })
    .map(function ([key]) {
      return key;
    });
}

export function copyToClipboard(icons: string[], text: string) {
  if (icons.length === 0) {
    toast.push('No icons selected', {
      theme: { '--toastColor': 'red', '--toastBarBackground': 'red' }
    });
    return;
  }

  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      toast.push('Could not copy to clipboard: Browser does not support', {
        theme: { '--toastColor': 'red', '--toastBarBackground': 'red' }
      });
    }
    textArea.blur();
    textArea.remove();
  } else {
    navigator.clipboard.writeText(text);
  }

  toast.push('Copied to clipboard');
}
