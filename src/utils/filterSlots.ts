import { CalendarEvent } from '~types/google';

export function filterSlots(day: string, events: CalendarEvent[] | undefined) {
    if (!events || !day) return [];

    const startDay = 11;
    const endDay = 23;

    const startDateTime = day + `T${startDay}:00:00`;
    const endDateTime = day + `T${endDay}:00:00`;
    const workingHours: string[][] = getWorkingHours(startDay, endDay);

    const filteredEvents = filterEvents(events, [startDateTime, endDateTime]);

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

const filterEvents = (events: CalendarEvent[], dateTimes: string[]) => {
    const [startDateTime, endDateTime] = dateTimes;

    const sortedEvents = events?.sort((a, b) =>
        a.start.dateTime.localeCompare(b.start.dateTime),
    );

    const filteredEvents = sortedEvents?.filter((event) => {
        const before = event.end.dateTime.localeCompare(startDateTime);
        const later = endDateTime.localeCompare(event.start.dateTime);

        return before === 1 && later === 1;
    });

    return filteredEvents;
};

const getWorkingHours = (startHour: number, endHour: number) => {
    const result = [];

    for (let hour = startHour; hour < endHour; hour++) {
        result.push([String(hour), String(hour + 1)]);
    }

    return result;
};

const getOffsetUTCFromStringDate = (stringDate: string) => {
    const match = stringDate.match(/([+-]\d{2}:\d{2})$/);
    return match ? match[1] : '';
};
