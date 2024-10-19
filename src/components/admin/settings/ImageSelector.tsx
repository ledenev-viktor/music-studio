import { useMemo } from 'react';
import { Select, SelectProps } from 'antd';
import { useGetImages } from '~hooks/images';
import { useNotification } from '~notifications';

export const ImageSelector = () => {
    const { notification } = useNotification();
    const { data: images, isLoading: isImagesLoading } = useGetImages();
    // const { mutateAsync: setMainImage } = useSetMainImage();

    const defaultOption = images?.find((image) => image.isSelected);

    const options = useMemo(
        () =>
            images?.map((image) => ({
                label: image.name,
                value: image.url,
                uid: image.uid,
            })),
        [images],
    );

    const onChange: SelectProps['onChange'] = (image) => {
        const option = options?.find((option) => option.value === image);

        if (!option) {
            notification.error({
                message: 'Something went wrong',
                description: 'Reload page and try again',
                placement: 'bottom',
            });
            return;
        }

        // setMainImage({
        //     uid: option.uid,
        //     name: option.label,
        //     url: option.value,
        //     isSelected: true,
        // });
    };

    const filterOption = (
        input: string,
        option?: { label: string; value: string },
    ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Select
            title="Main picture photo"
            loading={isImagesLoading}
            style={{ width: '100%' }}
            defaultValue={defaultOption?.url}
            showSearch
            placeholder="Select image for main screen"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={filterOption}
            options={options}
        />
    );
};
