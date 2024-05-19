import { ReactNode } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Flex, DescriptionsProps, Typography } from 'antd';
import { FieldValues } from 'react-hook-form';
import { extractDay, extractDate } from '~utils/date.helpers';
import { COLORS } from '~variables';
import { STEP, STEP_TYPE } from '~constants/registrationSteps';

const DescriptionItemContentWrapper = ({
    children,
    onEditClick,
}: {
    children: ReactNode;
    onEditClick: () => void;
}) => {
    return (
        <Flex vertical style={{ position: 'relative' }}>
            <EditOutlined
                onClick={onEditClick}
                style={{
                    position: 'absolute',
                    right: '2%',
                    top: '30%',
                    fontSize: '20px',
                    color: COLORS.grey,
                    opacity: 0.5,
                }}
            />
            {children}
        </Flex>
    );
};

export const useGetReviewInfo = (
    handleEdit: (step: STEP) => void,
    fields: FieldValues,
) => {
    const { date, userName, userNameTelegram, comment, selectedTimeSlots } =
        fields;

    const onClick = (fieldType: STEP_TYPE) => {
        if (fieldType === STEP_TYPE.ADDITIONS) {
            handleEdit(STEP.ADDITIONAL_STEP);
        }

        if (fieldType === STEP_TYPE.DATE_INFO) {
            handleEdit(STEP.DATE_TIME_STEP);
        }

        if (fieldType === STEP_TYPE.USER_INFO) {
            handleEdit(STEP.CONTACTS_STEP);
        }
    };

    return [
        {
            key: '1',
            label: 'Name',
            children: (
                <DescriptionItemContentWrapper
                    onEditClick={() => onClick(STEP_TYPE.USER_INFO)}
                >
                    <Typography.Paragraph
                        style={{ minWidth: '180px', textWrap: 'pretty' }}
                    >
                        {userName}
                    </Typography.Paragraph>
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
                    <Typography.Title level={5} style={{ margin: 0 }}>
                        {extractDay(date)}
                    </Typography.Title>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                        {extractDate(date)}
                    </Typography.Title>
                    <Typography.Paragraph>
                        {JSON.stringify(selectedTimeSlots)}
                    </Typography.Paragraph>
                </DescriptionItemContentWrapper>
            ),
        },
        {
            key: '4',
            label: 'Comment',
            children: (
                <DescriptionItemContentWrapper
                    onEditClick={() => onClick(STEP_TYPE.ADDITIONS)}
                >
                    <Typography.Paragraph>
                        {comment ? comment : '-'}
                    </Typography.Paragraph>
                </DescriptionItemContentWrapper>
            ),
        },
    ] as DescriptionsProps['items'];
};