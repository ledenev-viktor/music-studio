import { Card, Flex, Typography } from 'antd';
import { Images } from '~shared/types/images';
import {
    PicturesUpload,
    ListQuestionsEdit,
    ListSlidesEdit,
} from '~features/admin';
import { ListTeamEdit } from '~features/admin/ui/settings/team';

export const Settings = ({ images }: { images?: Images }) => {
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
            <ListSlidesEdit />
            <ListTeamEdit />
            <ListQuestionsEdit />
        </>
    );
};
