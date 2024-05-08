import { useEffect, useState } from 'react';
import { Flex, Typography, notification } from 'antd';
import { useFormContext, FieldValues, useWatch } from 'react-hook-form';
import styled from '@emotion/styled';
import moment from 'moment';
import type { CalendarEvent, CalendarEventWithLabel } from '~types/google';
import { sendDataAppointments } from '~hooks/send-events-form';
import {
    FormDatePicker,
    FormInput,
    FormTextarea,
    TimeSlots,
    Button,
} from '~components/ui/hook-form';

type RegFormBaseProps = {
    className?: string;
    eventsData: {
        days: string[];
        events: CalendarEvent[];
    };
};

export const FormComponentBase = ({
    className,
    eventsData,
}: RegFormBaseProps) => {
    const { Title, Text } = Typography;
    const { handleSubmit, control } = useFormContext();
    const [currentEvents, setCurrentEvents] = useState([]);
    const [toast, contextToast] = notification.useNotification();

    const openToast = () => {
        toast['success']({
            message: 'Application sent!',
        });
    };

    const { reset, resetField } = useFormContext();

    const dateValue = useWatch({ control, name: 'date' });

    const onSubmit = async (data: FieldValues) => {
        sendDataAppointments(data).then((res) => {
            if (res.status === 200) openToast();
        });
        setCurrentEvents([]);
        reset();
    };

    useEffect(() => {
        if (!eventsData.days || !dateValue) return;
        setCurrentEvents([]);
        resetField('timeSlotsEvent');

        const formatCurrentDate = moment(dateValue.$d).format('YYYY-MM-DD');

        const dayEvent = eventsData.days?.find(
            (element: string) => element === formatCurrentDate,
        );

        let eventsWithLabel = [];
        if (dayEvent) {
            eventsWithLabel = eventsData.events[dayEvent].map(
                (event: CalendarEventWithLabel) => {
                    event.label = {
                        start: moment(event.start.dateTime).format('hh:mm'),
                        end: moment(event.end.dateTime).format('hh:mm'),
                    };

                    return event;
                },
            );
        }
        setCurrentEvents(eventsWithLabel);
    }, [dateValue, eventsData, handleSubmit, resetField]);

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            {contextToast}
            <Title level={2}>Registration form</Title>
            <FormDatePicker
                name="date"
                placeholder=""
                label="Select date"
                disabledDate={(current) => {
                    return current && current < moment().startOf('day');
                }}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />
            {currentEvents.length > 0 ? (
                <TimeSlots
                    name="timeSlotsEvent"
                    label="Available timeslots"
                    timeslots={currentEvents}
                    rules={{
                        required: {
                            value: true,
                            message: 'This field is required',
                        },
                    }}
                />
            ) : (
                dateValue && (
                    <Text>
                        There are no appointments on this day. Please choose
                        another day.
                    </Text>
                )
            )}
            <FormInput
                name="userName"
                label="Full Name"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />
            <FormInput
                name="userNameTelegram"
                label="Telegram Username"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />
            <FormTextarea
                name="comment"
                label="Comment"
                control={control}
                placeholder="Indicate additional instruments that will be required for rehearsal"
            />
            <Flex>
                <Button disabled={!currentEvents.length} htmlType="submit">
                    Submit
                </Button>
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

    h2 {
        margin: 0 0 30px;
    }

    @media screen and (max-width: 767px) {
        padding: 20px;
        h2 {
            margin: 0 0 20px;
        }
    }
`;
