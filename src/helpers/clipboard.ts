export const clipboardCopy = (value: string | null, successMessage?: string, errorMessage?: string) => {
    if (!value) return;

    navigator.clipboard.writeText(value)
        .then(() => window.emitter.emit<{ value: string }>('tooltip:show', {value: successMessage || 'Link copied to clipboard.'}))
        .catch(() => window.emitter.emit<{ value: string }>('copy:show', {value: errorMessage || 'Cannot copy.'}))
}
