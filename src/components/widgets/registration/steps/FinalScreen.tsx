import { ReactNode } from 'react';
import { Descriptions, DescriptionsProps, Flex, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { EditOutlined } from '@ant-design/icons';
import { extractDate, extractDay } from '~utils/date.helpers';
import { Button } from '~components/ui/hook-form';
import { STEP, STEP_TYPE } from '~constants/registrationSteps';

const DescriptionItemContentWrapper = ({
    children,
    onEditClick,
}: {
    children: ReactNode;
    onEditClick: () => void;
}) => {
    return (
        <Flex vertical>
            <Flex justify="flex-end">
                <EditOutlined onClick={onEditClick} />
            </Flex>
            {children}
        </Flex>
    );
};

export const FinalScreen = ({
    onSubmit,
    handleEdit,
}: {
    onSubmit: () => void;
    handleEdit: (value: STEP) => void;
}) => {
    const { t } = useTranslation();
    const { getValues } = useFormContext();
    const {
        date,
        userName,
        userNameTelegram,
        comment,
        isCommentNeeded,
        selectedTimeSlots,
    } = getValues();

    const onClick = (fieldType: STEP_TYPE) => {
        if (fieldType === STEP_TYPE.ADDITIONS) {
            handleEdit(STEP.ADDITIONAL_STEP);
        }

        if (fieldType === STEP_TYPE.DATE_INFO) {
            handleEdit(STEP.TIME_SLOTS_STEP);
        }

        if (fieldType === STEP_TYPE.USER_INFO) {
            handleEdit(STEP.CONTACTS_STEP);
        }
    };

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Name',
            children: (
                <DescriptionItemContentWrapper
                    onEditClick={() => onClick(STEP_TYPE.USER_INFO)}
                >
                    <Typography.Paragraph>{userName}</Typography.Paragraph>
                </DescriptionItemContentWrapper>
            ),
        },
        {
            key: '2',
            label: 'Contacts',
            children: (
                <DescriptionItemContentWrapper
                    onEditClick={() => onClick(STEP_TYPE.USER_INFO)}
                >
                    <Typography.Paragraph>
                        Telegram: {userNameTelegram}
                    </Typography.Paragraph>
                </DescriptionItemContentWrapper>
            ),
        },
        {
            key: '3',
            label: 'Selected Time',
            children: (
                <DescriptionItemContentWrapper
                    onEditClick={() => onClick(STEP_TYPE.DATE_INFO)}
                >
                    <Typography.Title level={5} style={{ marginTop: 0 }}>
                        {extractDate(date) + ' ' + extractDay(date)}
                    </Typography.Title>
                    <Typography.Paragraph>
                        {JSON.stringify(selectedTimeSlots)}
                    </Typography.Paragraph>
                </DescriptionItemContentWrapper>
            ),
        },
    ];

    if (isCommentNeeded)
        items.push({
            key: '4',
            label: 'Comment',
            children: (
                <DescriptionItemContentWrapper
                    onEditClick={() => onClick(STEP_TYPE.ADDITIONS)}
                >
                    <Typography.Paragraph>{comment}</Typography.Paragraph>
                </DescriptionItemContentWrapper>
            ),
        });

    return (
        <Flex vertical gap={20} align="stretch">
            <Typography.Title level={3} style={{ margin: 0 }}>
                Let`s verify appointment
            </Typography.Title>
            <Descriptions items={items} column={1} size="middle" bordered />
            <Flex justify="flex-end">
                <Button onClick={onSubmit}>{t('continue')}</Button>
            </Flex>
        </Flex>
    );
};