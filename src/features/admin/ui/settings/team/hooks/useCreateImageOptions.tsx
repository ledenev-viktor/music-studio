import { useGetImages } from '~shared/hooks/images';

export const useCreateImageOptions = () => {
    const { data: images } = useGetImages();

    return images?.map((image) => {
        return {
            label: <img src={image.thumbnail} alt="" />,
            value: image.url,
            fileDownload: image.urlFileDownload,
        };
    });
};
