import { Appointment, Appointments } from '~types/appointments';
import { DAY_NAMES } from '~constants/dates';

export function extractTime(dateString: string) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function extractDate(dateString: string) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

export function extractDay(dateString: string) {
    const date = new Date(dateString);
    return DAY_NAMES[date.getDay()];
}

export function prettifyAppointments(
    appointments: Appointment[],
): Appointments {
    const appointmentsDates: string[] = [];
    const groupedAppointments = appointments.reduce(
        (acc, obj) => {
            const date = obj.date;
            if (!appointmentsDates.find((it) => it === obj.date))
                appointmentsDates.push(obj.date);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(obj);
            return acc;
        },
        {} as Record<string, Appointment[]>,
    );

    // Sort the appointments within each date group
    for (const date in groupedAppointments) {
        groupedAppointments[date].sort((a, b) => {
            return a.startTime.localeCompare(b.startTime);
        });
    }

    // Sort the array
    const sortedDatesArray = appointmentsDates.sort((a: string, b: string) => {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        return dateA - dateB;
    });

    return sortedDatesArray.map((date) => [date, groupedAppointments[date]]);
}
