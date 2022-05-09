


export const beautifyPhone = (phone: string | null): string=>  {
    if (!phone) return '';

    return `+ ${phone[0]} ${phone.slice(1, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
}