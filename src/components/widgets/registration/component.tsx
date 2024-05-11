import { useState } from 'react';
import { Col, Flex, Row, Switch, Typography } from 'antd';
import { useFormContext, FieldValues } from 'react-hook-form';
import styled from '@emotion/styled';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import type { CalendarEvent } from '~types/google';
import { useMobile } from '~hooks/responsive';
import {
    FormDatePicker,
    FormInput,
    FormTextarea,
    TimeSlots,
    Button,
} from '~components/ui/hook-form';
import { BREAKPOINTS } from '~constants/breakpoints';

type RegFormBaseProps = {
    className?: string;
    eventsData: {
        days: string[];
        events: CalendarEvent[];
    };
};

const timeslots = [
    {
        id: 1,
        value: 1,
        label: '11:00 - 12:00',
    },
    {
        id: 2,
        value: 2,
        label: '12:00 - 13:00',
    },
    {
        id: 3,
        value: 3,
        label: '13:00 - 14:00',
    },
    {
        id: 4,
        value: 4,
        label: '14:00 - 15:00',
    },
    {
        id: 5,
        value: 5,
        label: '15:00 - 16:00',
    },
    {
        id: 6,
        value: 6,
        label: '16:00 - 17:00',
    },
    {
        id: 7,
        value: 7,
        label: '17:00 - 18:00',
    },
    {
        id: 8,
        value: 8,
        label: '18:00 - 19:00',
    },
    {
        id: 9,
        value: 9,
        label: '19:00 - 20:00',
    },
    {
        id: 10,
        value: 10,
        label: '20:00 - 21:00',
    },
    {
        id: 11,
        value: 11,
        label: '21:00 - 22:00',
    },
    {
        id: 12,
        value: 12,
        label: '22:00 - 23:00',
    },
];

export const FormComponentBase = ({
    className,
    eventsData,
}: RegFormBaseProps) => {
    const { t } = useTranslation();
    const { Title } = Typography;
    const { handleSubmit, control } = useFormContext();
    const [addComment, setAddComment] = useState(false);
    const isMobile = useMobile();

    const { reset, resetField } = useFormContext();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        console.log(eventsData);
        reset();
    };

    const handleAddComment = () => {
        setAddComment(!addComment);
        if (addComment) resetField('comment');
    };

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            <FormDatePicker
                name="date"
                placeholder=""
                label={t('content_form_select_title')}
                disabledDate={(current) => {
                    return current && current < moment().startOf('day');
                }}
                rules={{
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
            />
            <TimeSlots
                name="timeSlotsEvent"
                label={t('content_form_slots_title')}
                timeslots={timeslots}
                rules={{
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
            />
            <Row gutter={[20, 0]}>
                <Col span={isMobile ? 24 : 12}>
                    <FormInput
                        name="userName"
                        label={t('content_form_name_title')}
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('required_filed'),
                            },
                        }}
                    />
                </Col>
                <Col span={isMobile ? 24 : 12}>
                    <FormInput
                        name="userNameTelegram"
                        label={t('content_form_tg_title')}
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: t('required_filed'),
                            },
                        }}
                    />
                </Col>
            </Row>
            <Flex align="center" style={{ margin: '0 0 15px' }}>
                <Switch
                    title={t('content_form_comment_title')}
                    onChange={handleAddComment}
                />
                <Typography.Text
                    style={{
                        margin: '0 0 0 15px',
                        fontSize: '18px',
                        fontWeight: '400',
                    }}
                >
                    {t('content_form_comment_title')}
                </Typography.Text>
            </Flex>
            {addComment && (
                <FormTextarea
                    name="comment"
                    control={control}
                    placeholder={t('content_form_additionals_title')}
                />
            )}

            <Flex className="button-wrapper">
                <Button htmlType="submit">{t('submit')}</Button>
            </Flex>
        </form>
    );
};

export const FormComponent = styled(FormComponentBase)`
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 60px 60px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px -14px rgba(0, 0, 0, 1);
    border-radius: 15px;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        padding: 20px;
    }

    .group-field {
        margin: 0 -10px;
        flex-wrap: nowrap;
        &-item {
            width: calc(50% - 20px);
            margin: 0 10px;
        }

        @media screen and (max-width: ${BREAKPOINTS.mobile}) {
            margin: 0;
            flex-wrap: wrap;
            &-item {
                width: 100%;
                margin: 0;
            }
        }
    }

    .button-wrapper {
        justify-content: flex-end;
        margin-top: 50px;
        @media screen and (max-width: ${BREAKPOINTS.mobile}) {
            justify-content: center;
        }
    }
`;
