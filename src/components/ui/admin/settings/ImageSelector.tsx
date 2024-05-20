import { useMemo, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { useGetImages } from '~hooks/images';
import { useGetSettings, useUpdateSettings } from '~hooks/settings';

export const ImageSelector = () => {
    const { data: images, isLoading: isImagesLoading } = useGetImages();
    const { mutateAsync: updateSettings } = useUpdateSettings();
    const { data: settings } = useGetSettings();
    const [selectedImages, setSelected] = useState<string[]>(
        settings?.images || [],
    );

    const options = useMemo(
        () =>
            images?.map((image) => ({
                label: image.name,
                value: image.url,
                uid: image.uid,
            })),
        [images],
    );

    const onDeselect: SelectProps['onDeselect'] = (value) => {
        setSelected(selectedImages.filter((image) => image !== value));
        updateSettings(selectedImages);
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
            showSearch
            placeholder="Select image for main screen"
            optionFilterProp="children"
            onChange={(image) => {
                setSelected(image);
            }}
            onBlur={() => {
                updateSettings(selectedImages);
            }}
            onDeselect={onDeselect}
            filterOption={filterOption}
            options={options}
            value={selectedImages}
            mode="multiple"
        />
    );
};
