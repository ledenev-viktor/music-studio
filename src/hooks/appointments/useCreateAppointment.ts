import { useMutation } from '@tanstack/react-query';
import api from '~lib/api.helper';
import { FormFields } from '~types/appointments';

export const useCreateAppointments = () => {
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
        onSuccess: () => {},
        onError: () => {},
    });
};
