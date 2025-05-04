export const getImageName = (url: string) => {
    const mainUrlComponents = url.split('?')?.[0].split('/');
    return mainUrlComponents[mainUrlComponents.length - 1];
};
