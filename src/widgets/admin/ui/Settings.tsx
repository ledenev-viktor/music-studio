import { Card, Flex, Typography } from 'antd';
import { Images } from '~types/images';
import { ListSlides, PicturesUpload } from '~ui/admin/settings';
import { Slide } from '~types/settings';

export const Settings = ({
    images,
    slidesData,
}: {
    images?: Images;
    slidesData: Slide[];
}) => {
    return (
        <>
            <Flex vertical gap={20} align="center">
                <Card
                    title={
                        <Typography.Title level={2}>
                            Images storage
                        </Typography.Title>
                    }
                    style={{ maxWidth: '1365px', width: '100%' }}
                >
                    <Flex vertical gap={10}>
                        <PicturesUpload images={images} />
                    </Flex>
                </Card>
            </Flex>
            <ListSlides slidesData={slidesData} />
        </>
    );
};
