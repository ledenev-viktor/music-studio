import { AnimatePresence } from 'framer-motion';
import {
    useFormContext,
    Controller,
    UseControllerProps,
} from 'react-hook-form';
import { Flex } from 'antd';
import { Dayjs } from 'dayjs';
import { DaysWithSlots } from '~types/days';
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
    const { control } = useFormContext();

    return (
        <Flex vertical>
            <AnimatePresence mode="wait" initial={false}>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { onChange } }) => (
                        <Calendar
                            isLoadingSlots={isLoadingSlots}
                            days={days}
                            onDayChange={onChange}
                            onWeekChange={(start: Dayjs, end: Dayjs) => {
                                setEndDate(end);
                                setStartDate(start);
                            }}
                        />
                    )}
                />
            </AnimatePresence>
        </Flex>
    );
};
