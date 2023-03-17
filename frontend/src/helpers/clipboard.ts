export const clipboardCopy = (value: string | null, successMessage?: string, errorMessage?: string) => {
  if (!value) return;

  navigator.clipboard.writeText(value)
    .then(() => window.emitter.emit('tooltip:show', {value: successMessage || 'Link copied to clipboard.'}))
    .catch(() => window.emitter.emit('copy:show', {value: errorMessage || 'Cannot copy.'}));
};
