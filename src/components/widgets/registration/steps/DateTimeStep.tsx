import { useState } from 'react';
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

    return (
        <StepWrapper onSaveEdits={onSaveEdits} onGoToNextStep={onGoToNextStep}>
            <CalendarField
                days={days}
                name="date"
                rules={{
                    required: {
                        value: true,
                        message: t('application:required'),
                    },
                }}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                isLoadingSlots={isLoadingSlots}
            />
            {!date && (
                <Alert type="warning" message={t('application:required')} />
            )}
            {date && (
                <TimeSlots
                    name="selectedTimeSlots"
                    label={t('application:timeSlotsTitle')}
                    timeSlots={days[date]?.slots}
                    rules={{
                        required: {
                            value: true,
                            message: t('application:required'),
                        },
                    }}
                />
            )}
        </StepWrapper>
    );
};
