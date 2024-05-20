import { CalendarEvent } from '~types/google';
import { filterEventsBySchedule } from './filterEventsBySchedule';
import { getWorkingHours } from './getWorkingHours';
import { getOffsetUTCFromStringDate } from './getOffsetUTCFromStringDate';
import { START_DAY, END_DAY } from '~constants/schedule';

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

    if (!filteredEvents?.length) return workingHours;

    let j = 0;
    const result = [];
    const offsetUTC = getOffsetUTCFromStringDate(
        filteredEvents[0].start.dateTime,
    );

    for (let i = 0; i < workingHours?.length; i += 1) {
        const [hourStart, hourEnd] = workingHours[i];

        const dateStart = day + `T${hourStart}:00:00${offsetUTC}`;
        const dateEnd = day + `T${hourEnd}:00:00${offsetUTC}`;

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
