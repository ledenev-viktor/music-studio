import { Flex } from 'antd';
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { FormDatePicker, TimeSlots, Button } from '~components/ui/hook-form';

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

export const TimeSlotsScreen = ({
    onGoToNextStep,
    onSaveEdits,
}: {
    onGoToNextStep: () => void;
    onSaveEdits?: () => void;
}) => {
    const { t } = useTranslation();

    return (
        <Flex vertical gap={30}>
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
                name="selectedTimeSlots"
                label={t('content_form_slots_title')}
                timeslots={timeslots}
                rules={{
                    required: {
                        value: true,
                        message: t('required_filed'),
                    },
                }}
            />
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
