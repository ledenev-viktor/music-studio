import { FC, useEffect, useState } from 'react';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import moment from 'moment';
import { useGetEvents } from '~hooks/events';
import { FormComponent } from './FormComponent';

type RegistrationFormProps = {
    className?: string;
};

export const RegistrationForm: FC<RegistrationFormProps> = () => {
    const { data: events } = useGetEvents();

    const defaultValues = {
        date: '',
        userName: '',
        userNameTelegram: '',
        timeSlotsEvent: [],
        comment: '',
    };

    const form = useForm<FieldValues>({
        defaultValues,
        mode: 'onChange',
    });

    const [eventsSortedDays, setEventsSortedDays] = useState({
        days: [],
        events: [],
    });
    useEffect(() => {
        const eventsWithDays: any = {
            days: [],
            events: {},
        };

        events?.forEach((event) => {
            const date = moment(event.start.dateTime).format('YYYY-MM-DD');
            if (!date) return;

            if (date in eventsWithDays.events) {
                eventsWithDays.events[date]?.push({
                    ...event,
                });
            } else {
                eventsWithDays.events[date] = [
                    {
                        ...event,
                    },
                ];
                eventsWithDays.days.push(date);
            }
        });

        setEventsSortedDays(eventsWithDays);
    }, [events]);

    return (
        <FormProvider {...form}>
            <FormComponent eventsData={eventsSortedDays} />
        </FormProvider>
    );
};
