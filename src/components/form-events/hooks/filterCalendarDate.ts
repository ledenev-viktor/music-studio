import { useEffect, useState } from 'react';
import moment from 'moment';
import { CalendarEvent } from '../mock/events';

export const useFilterCalendarDate = (
    selectedDate: string,
    events: CalendarEvent[],
) => {
    const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([]);
    useEffect(() => {
        const date = new Date(selectedDate);
        const formatedDate = moment(date).format('YYYY-MM-DD');

        const filteredEvents = events.filter((event) => {
            return (
                moment(new Date(event.start.dateTime)).format('YYYY-MM-DD') ===
                formatedDate
            );
        });

        setFilteredEvents(filteredEvents);
    }, [events, selectedDate]);

    return [filteredEvents];
};
