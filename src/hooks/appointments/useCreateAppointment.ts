import { useMutation } from '@tanstack/react-query';
import api, { AxiosApiError, AxiosApiResponse } from '~lib/api.helper';
import { FormFields } from '~types/appointments';
import { mergeIntervals } from '~utils/mergeIntervals';

export const useCreateAppointments = () => {
    return useMutation<AxiosApiResponse<void>, AxiosApiError, FormFields>({
        mutationFn: (data) => {
            const {
                date,
                phone,
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
                        phone,
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

            return api.post<void>(
                '/api/supabase/appointments/insert',
                sendArrayData,
            );
        },
        onSuccess: () => {},
        onError: () => {},
    });
};
