import { Card, Flex, Spin } from 'antd';
import { Images } from '~types/images';
import { ImageSelector, PicturesUpload } from '~ui/admin/settings';

export const Settings = ({
    images,
    isLoadingImages,
}: {
    images?: Images;
    isLoadingImages: boolean;
}) => {
    return (
        <Flex vertical gap={20}>
            <Card title="Images storage">
                {isLoadingImages ? (
                    <Flex align="center" justify="center">
                        <Spin size="large" />
                    </Flex>
                ) : (
                    <Flex vertical gap={10}>
                        <PicturesUpload images={images} />
                        <ImageSelector />
                    </Flex>
                )}
            </Card>
        </Flex>
    );
};