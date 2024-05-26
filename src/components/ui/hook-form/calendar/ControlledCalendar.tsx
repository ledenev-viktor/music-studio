import { AnimatePresence } from 'framer-motion';
import {
    useFormContext,
    Controller,
    UseControllerProps,
    useWatch,
} from 'react-hook-form';
import { Flex } from 'antd';
import { Dayjs } from 'dayjs';
import { DaysWithSlots } from '~types/days';
import { FormFields } from '~types/appointments';
import { Calendar } from './Calendar';

export const CalendarField = ({
    name,
    rules,
    days,
    setEndDate,
    setStartDate,
    isLoadingSlots,
}: UseControllerProps & {
    days: DaysWithSlots;
    setEndDate: (value: Dayjs) => void;
    setStartDate: (value: Dayjs) => void;
    isLoadingSlots: boolean;
}) => {
    const { control, setValue } = useFormContext();
    const [date, weekStartDay] = useWatch<FormFields, ['date', 'weekStartDay']>(
        {
            name: ['date', 'weekStartDay'],
        },
    );
    return (
        <Flex vertical>
            <AnimatePresence mode="wait" initial={false}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { onChange } }) => (
                        <Calendar
                            date={date}
                            weekStartDay={weekStartDay}
                            isLoadingSlots={isLoadingSlots}
                            days={days}
                            onDayChange={(value) => {
                                onChange(value);
                                setValue('selectedTimeSlots', []);
                            }}
                            onWeekChange={(start: Dayjs, end: Dayjs) => {
                                setEndDate(end);
                                setStartDate(start);
                                setValue('weekStartDay', start);
                            }}
                        />
                    )}
                />
            </AnimatePresence>
        </Flex>
    );
};
