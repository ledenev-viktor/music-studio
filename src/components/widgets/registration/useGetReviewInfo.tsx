import { ReactNode } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Flex, DescriptionsProps, Typography, List } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { extractDay, extractDate } from '~utils/date.helpers';
import { COLORS } from '~variables';
import { mergeIntervals } from '~utils/mergeIntervals';
import { convertToAmPm } from '~utils/convertToAmPm';
import { STEP, STEP_TYPE } from '~constants/registrationSteps';

const DescriptionItemContentWrapper = ({
    children,
    onEditClick,
}: {
    children: ReactNode;
    onEditClick: () => void;
}) => {
    return (
        <Flex vertical style={{ position: 'relative', padding: '0 35px 0 0' }}>
            <EditOutlined
                onClick={onEditClick}
                style={{
                    position: 'absolute',
                    right: '2%',
                    top: '50%',
                    fontSize: '20px',
                    color: COLORS.grey,
                    opacity: 0.5,
                    zIndex: 2,
                    transform: 'translateY(-50%)',
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
    const { locale } = useRouter();

    const {
        date,
        userName,
        userNameTelegram,
        userNameInstagram,
        additionEquipment,
        comment,
        selectedTimeSlots,
    } = fields;

    const mergedSelectedTimeSlotsLabels = mergeIntervals(selectedTimeSlots).map(
        (slot) => (locale === 'en' ? convertToAmPm(slot.label) : slot.label),
    );

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
                    <Flex vertical>
                        {userNameTelegram && (
                            <Typography.Paragraph>
                                Telegram: {userNameTelegram}
                            </Typography.Paragraph>
                        )}
                        {userNameInstagram && (
                            <Typography.Paragraph>
                                Instagram: {userNameInstagram}
                            </Typography.Paragraph>
                        )}
                    </Flex>
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
                    <Typography.Title level={5} style={{ marginTop: 0 }}>
                        {extractDate(date)}
                    </Typography.Title>
                    {mergedSelectedTimeSlotsLabels.map((slot) => (
                        <Typography.Paragraph key={slot} style={{ margin: 0 }}>
                            {slot}
                        </Typography.Paragraph>
                    ))}
                </DescriptionItemContentWrapper>
            ),
        },
        {
            key: '4',
            label: 'Additionally',
            children: (
                <DescriptionItemContentWrapper
                    onEditClick={() => onClick(STEP_TYPE.ADDITIONS)}
                >
                    {additionEquipment.length > 0 ? (
                        <List
                            dataSource={additionEquipment!.map(
                                (item: { label: string }) => item.label,
                            )}
                            renderItem={(item: string) => (
                                <List.Item>{item}</List.Item>
                            )}
                        />
                    ) : (
                        '-'
                    )}
                </DescriptionItemContentWrapper>
            ),
        },
        {
            key: '5',
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
