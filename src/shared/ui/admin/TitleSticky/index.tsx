import { ReactNode } from 'react';
import { Flex, Typography } from 'antd';
import s from './TitleSticky.module.scss';

export const TitleSticky = ({
    rightSlot,
    title,
}: {
    rightSlot: ReactNode;
    title: string;
}) => {
    return (
        <Flex
            gap={10}
            justify="space-between"
            align="center"
            className={s.wrapper}
        >
            <Typography.Title level={2}>{title}</Typography.Title>
            {rightSlot}
        </Flex>
    );
};
