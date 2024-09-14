import { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Alert } from 'antd';
import { useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import { useGetDays, useSetDays } from '~hooks/useDays';
import { FormFields } from '~types/appointments';
import { StepWrapper } from './StepWrapper';
import { TimeSlots, CalendarField } from '~components/ui/hook-form';

export const DateTimeStep = ({
    onGoToNextStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();
    const [date, weekStartDay] = useWatch<FormFields, ['date', 'weekStartDay']>(
        {
            name: ['date', 'weekStartDay'],
        },
    );
    const [startDate, setStartDate] = useState(
        weekStartDay ? weekStartDay : dayjs(),
    );
    const [endDate, setEndDate] = useState(startDate.add(1, 'week'));

    const isLoadingSlots = useSetDays(startDate, endDate);
    const days = useGetDays(startDate, endDate);

    const availableTime = useMemo(
        () =>
            days[date]?.slots.map((day) => {
                const date1 = day.id.split('~')[0];
                const dateWithSubtractedHour = dayjs(date1).subtract(1, 'hour'); // appointments must be made 1 hour in advance
                const dateNow = dayjs().format('YYYY-MM-DDTHH:mm:ss');
                const disabled = dayjs(dateNow).isAfter(dateWithSubtractedHour);
                return { ...day, disabled };
            }),
        [date, days],
    );

    return (
        <StepWrapper onSaveEdits={onSaveEdits} onGoToNextStep={onGoToNextStep}>
            <CalendarField
                days={days}
                name="date"
                rules={{
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                isLoadingSlots={isLoadingSlots}
            />
            {!date && (
                <Alert
                    type="warning"
                    message="Please select date to see available time"
                />
            )}
            {date && (
                <TimeSlots
                    name="selectedTimeSlots"
                    label={t('content_form_slots_title')}
                    timeSlots={availableTime}
                    rules={{
                        required: {
                            value: true,
                            message: t('required_filed'),
                        },
                    }}
                />
            )}
        </StepWrapper>
    );
};
