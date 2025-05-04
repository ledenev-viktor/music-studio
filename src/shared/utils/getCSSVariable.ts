export const getCSSVariable = (variableName: string): string => {
    if (typeof document !== 'undefined') {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variableName)
            .trim();
    }

    return '';
};
