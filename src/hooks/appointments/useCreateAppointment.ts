import { useMutation } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';
import { FormFields } from '~types/appointments';

export const useCreateAppointments = () => {
    const { notification } = useNotification();

    return useMutation<any, any, FormFields>({
        mutationFn: (data) => {
            const {
                selectedTimeSlots,
                userName,
                userNameTelegram,
                userNameInstagram,
                additionEquipment,
                comment,
            } = data;

            const sendArrayData = selectedTimeSlots.map((slot: any) => {
                const [startTime, endTime] = slot.id.split('~');

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
            });

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
