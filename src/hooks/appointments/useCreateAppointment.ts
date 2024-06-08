import { useMutation } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';
import { FormFields } from '~types/appointments';
import { mergeIntervals } from '~utils/mergeIntervals';

export const useCreateAppointments = () => {
    const { notification } = useNotification();

    return useMutation<any, any, FormFields>({
        mutationFn: (data) => {
            const {
                date,
                selectedTimeSlots,
                userName,
                userNameTelegram,
                userNameInstagram,
                additionEquipment,
                comment,
            } = data;

            const mergedSelectedTimeSlots = mergeIntervals(selectedTimeSlots);

            const sendArrayData = mergedSelectedTimeSlots.map(
                (slot: { id: number; label: string; value: string }) => {
                    const [startHour, endHour] = slot.value.split('-');
                    const [startTime, endTime] = [
                        `${date}T${startHour}:00:00`,
                        `${date}T${endHour}:00:00`,
                    ];

                    return {
                        fullName: userName,
                        comment: comment,
                        telegram: userNameTelegram,
                        instagram: userNameInstagram,
                        equipment: additionEquipment
                            .map((item: { label: string }) => item?.label)
                            .join(', '),
                        startTime,
                        endTime,
                    };
                },
            );

            return api.post<any>(
                '/api/supabase/appointments/insert',
                sendArrayData,
            );
        },
        onSuccess: () => {
            notification.success({
                message: 'Appointment has been created',
                placement: 'bottom',
            });
        },
        onError: (error) => {
            notification.error({
                message: 'Something went wrong',
                description: error.message,
                placement: 'bottom',
            });
        },
    });
};
