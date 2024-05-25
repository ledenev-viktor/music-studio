import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useGetAvailableSlots } from '~hooks/useGetAvailableSlots';
import { StepWrapper } from './StepWrapper';
import { FormDatePicker, TimeSlots } from '~components/ui/hook-form';

export const DateTimeStep = ({
    onGoToNextStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();
    const { slots, isLoadingEvents } = useGetAvailableSlots();
    const { locale } = useRouter();

    return (
        <StepWrapper onSaveEdits={onSaveEdits} onGoToNextStep={onGoToNextStep}>
            <FormDatePicker
                name="date"
                placeholder=""
                label={t('content_form_select_title')}
                disabledDate={(current) =>
                    current && current < dayjs().startOf('day')
                }
                rules={{
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
            />
            {isLoadingEvents ? (
                <Spin />
            ) : (
                <TimeSlots
                    locale={locale}
                    name="selectedTimeSlots"
                    label={t('content_form_slots_title')}
                    timeslots={slots}
                    emptySlotsMessage={t('slots_empty')}
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
