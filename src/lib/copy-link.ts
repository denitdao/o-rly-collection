/**
 * Copy a link to the clipboard
 * @param link The link to copy
 * @returns A promise that resolves when the link is copied
 */
export async function copyLinkToClipboard(link: string): Promise<void> {
  const clipboardItem = new ClipboardItem({
    "text/plain": new Blob([link], { type: "text/plain" }),
  });
  await navigator.clipboard.write([clipboardItem]);
}
