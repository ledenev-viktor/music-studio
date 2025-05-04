export const isAbsoluteUrl = (url) => {
    return /^https?:\/\/.+$/i.test(url);
};
