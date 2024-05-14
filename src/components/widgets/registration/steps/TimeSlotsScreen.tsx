import { Flex, Spin } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';
import { useGetAvailableSlots } from '~hooks/useGetAvailableSlots';
import { FormDatePicker, TimeSlots, Button } from '~components/ui/hook-form';

export const TimeSlotsScreen = ({
    onGoToNextStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();
    const valueDate = useWatch({ name: 'date' });
    const { slots, isLoadingEvents } = useGetAvailableSlots(valueDate);

    return (
        <Flex vertical gap={30}>
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

            <Flex justify="flex-end">
                {onSaveEdits ? (
                    <Button onClick={onSaveEdits}>{t('save')}</Button>
                ) : (
                    <Button onClick={onGoToNextStep}>{t('continue')}</Button>
                )}
            </Flex>
        </Flex>
    );
};
