import { useMutation } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { useNotification } from '~notifications';
import { FormFields } from '~types/appointments';

export const useCreateAppointments = () => {
    const { notification } = useNotification();

    return useMutation<any, any, FormFields>({
        mutationFn: (data) => {
            const { selectedTimeSlots, userName, userNameTelegram, comment } =
                data;

            const sendArrayData = selectedTimeSlots.map((slot: any) => {
                return {
                    fullName: userName,
                    comment: comment,
                    telegram: userNameTelegram,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
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
