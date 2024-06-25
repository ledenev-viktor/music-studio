import { useGetImages } from '~hooks/images';

export const useCreateImageOptions = () => {
    const { data: images } = useGetImages();

    return images?.map((image) => {
        return {
            label: <img src={image.url} alt="" />,
            value: image.url,
            fileDownload: image.urlFileDownload,
        };
    });
};
