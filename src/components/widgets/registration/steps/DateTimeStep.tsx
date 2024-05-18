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
    const date = useWatch<FormFields, 'date'>({ name: 'date' });
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(1, 'week'));

    const isLoadingSlots = useSetDays(startDate, endDate);

    const days = useGetDays(startDate, endDate);

    return (
        <StepWrapper
            onSaveEdits={onSaveEdits}
            onGoToNextStep={onGoToNextStep}
            isGoToNextStepDisabled={days[date] && !days[date]?.slots.length}
        >
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
                    timeslots={days[date]?.slots}
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
