import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { CalendarEvent } from '~types/google';
import { filterEventsBySchedule } from './filterEventsBySchedule';
import { getWorkingHours } from './getWorkingHours';
import { getOffsetUTCFromStringDate } from './getOffsetUTCFromStringDate';
import { START_DAY, END_DAY } from '~constants/schedule';

dayjs.extend(utc);
dayjs.extend(timezone);

const subtractHourDate = (date: string) => dayjs(date).subtract(1, 'hour'); // appointments must be made 1 hour in advance

export function getAvailableSlots(
    day: string,
    events: CalendarEvent[] | undefined,
) {
    if (!events || !day) return [];

    const startDay = START_DAY;
    const endDay = END_DAY;

    const startDateTime = day + `T${startDay}:00:00`;
    const endDateTime = day + `T${endDay}:00:00`;
    const workingHours: string[][] = getWorkingHours(startDay, endDay);

    const filteredEvents = filterEventsBySchedule(events, [
        startDateTime,
        endDateTime,
    ]);

    const dateNow = dayjs().tz('Asia/Tbilisi').format('YYYY-MM-DDTHH:mm:ss');

    const result = [];

    if (!filteredEvents?.length) {
        for (let i = 0; i < workingHours?.length; i += 1) {
            const [hourStart, hourEnd] = workingHours[i];

            const dateStart = day + `T${hourStart}:00:00`;
            const dateWithSubtractedHour = subtractHourDate(dateStart);

            if (!dayjs(dateNow).isAfter(dateWithSubtractedHour)) {
                result.push([hourStart, hourEnd]);
            }
        }
        return result;
    }

    let j = 0;

    const offsetUTC = getOffsetUTCFromStringDate(
        filteredEvents[0].start.dateTime,
    );

    for (let i = 0; i < workingHours?.length; i += 1) {
        const [hourStart, hourEnd] = workingHours[i];

        const dateStart = day + `T${hourStart}:00:00${offsetUTC}`;
        const dateEnd = day + `T${hourEnd}:00:00${offsetUTC}`;

        const dateWithSubtractedHour = subtractHourDate(dateStart);

        if (dayjs(dateNow).isAfter(dateWithSubtractedHour)) {
            continue;
        }

        let currentEvent = filteredEvents[j];
        if (currentEvent.end.dateTime.localeCompare(dateStart) <= 0) {
            if (j < filteredEvents.length - 1) {
                j += 1;
                currentEvent = filteredEvents[j];
            } else {
                result.push([hourStart, hourEnd]);
                continue;
            }
        }

        if (currentEvent.start.dateTime.localeCompare(dateEnd) >= 0) {
            result.push([hourStart, hourEnd]);
        }
    }

    return result;
}
