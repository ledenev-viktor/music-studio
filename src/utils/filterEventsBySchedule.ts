import { CalendarEvent } from '~types/google';

export const filterEventsBySchedule = (
    events: CalendarEvent[],
    dateTimes: string[],
) => {
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
