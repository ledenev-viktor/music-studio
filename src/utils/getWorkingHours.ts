import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const getWorkingHours = (
    startHour: number,
    endHour: number,
    day: string,
) => {
    if (endHour <= startHour) return [];

    const dateNow = '2024-09-22T11:00:00';

    const result = [];

    for (let hour = startHour; hour < endHour; hour++) {
        const dateStart = day + `T${hour}:00:00`;

        const dateWithSubtractedHour = dayjs(dateStart).subtract(1, 'hour');

        if (!dayjs(dateNow).isAfter(dateWithSubtractedHour)) {
            result.push([String(hour), String(hour + 1)]);
        }
    }

    return result;
};
