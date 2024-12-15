/* eslint-disable @typescript-eslint/no-unused-vars */
import { Appointment } from '~types/appointments';
import { AppointmentStatuses } from '~constants/status';

type Item = [string, Appointment[]];
type Data = Item[];

const filterBySearch = (data: Data, search: string) =>
    data
        ?.map(([date, appointments]) => {
            if (date.includes(search)) return [date, appointments] as Item;
            else {
                const filteredAppointments = appointments.filter(
                    (appointment) =>
                        appointment.fullName
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        appointment.telegram
                            ?.toLowerCase()
                            .includes(search.toLowerCase()),
                );

                return [date, filteredAppointments] as Item;
            }
        })
        .filter(([date, appointments]) => appointments.length > 0);

const filterByStatus = (data: Data, status: AppointmentStatuses | '') =>
    data
        ?.map(([key, appointments]) => {
            const filteredAppointments = appointments.filter(
                (appointment) => status === appointment.status,
            );

            return [key, filteredAppointments] as Item;
        })
        .filter(([_, appointments]) => appointments.length > 0);

export function filterAppointments(
    status: AppointmentStatuses | '',
    search: string,
    initialData?: Data,
): Data {
    if (!initialData?.length) return [];

    if (status.length && search.length) {
        const dataFilteredByStatus = filterByStatus(initialData, status);
        return filterBySearch(dataFilteredByStatus, search);
    }

    if (status.length) {
        return filterByStatus(initialData, status);
    }

    if (search.length) {
        return filterBySearch(initialData, search);
    }

    return initialData;
}
