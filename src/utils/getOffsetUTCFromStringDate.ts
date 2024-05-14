export const getOffsetUTCFromStringDate = (stringDate: string) => {
    const match = stringDate.match(/([+-]\d{2}:\d{2})$/);
    return match ? match[1] : '';
};
