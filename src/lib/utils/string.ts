export function toTitle(word: string): string {
  return word.replace(/(\w)(\w*)/g, (_, c, w) => `${c.toUpperCase()}${w.toLowerCase()}`);
}
