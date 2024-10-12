import dayjs from 'dayjs';
import { getAvailableSlots } from './getAvailableSlots';

describe('No data was transferred at all or incomplete data was transferred', () => {
    describe('There are no events', () => {
        const events = [];
        const date = '2030-05-21';
        it('Events is empty', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['11', '12'],
                ['12', '13'],
                ['13', '14'],
                ['14', '15'],
                ['15', '16'],
                ['16', '17'],
                ['17', '18'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
                ['21', '22'],
                ['22', '23'],
            ]);
        });
    });
    describe('Events take up the whole day', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T11:00:00+03:00' },
                end: { dateTime: '2030-05-21T23:00:00+03:00' },
            },
        ];
        const date = '2030-05-21';
        it('No free slots due to busy day with events from 11 to 23', () => {
            expect(getAvailableSlots(date, events)).toEqual([]);
        });
    });
    describe('Date not sent', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T11:00:00+03:00' },
                end: { dateTime: '2030-05-21T15:00:00+03:00' },
            },
        ];
        const date = '';
        it('No free slots due to unscheduled date', () => {
            expect(getAvailableSlots(date, events)).toEqual([]);
        });
    });
});

describe('Checking slot filtering', () => {
    const date = '2030-05-21';

    describe('Checking the event that occupies the first schedule interval', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T11:00:00+03:00' },
                end: { dateTime: '2030-05-21T12:00:00+03:00' },
            },
        ];

        it('The slot from 11 - 12 should be filtered', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['12', '13'],
                ['13', '14'],
                ['14', '15'],
                ['15', '16'],
                ['16', '17'],
                ['17', '18'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
                ['21', '22'],
                ['22', '23'],
            ]);
        });
    });
    describe('Checking an event that occupies the average schedule interval', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T17:00:00+03:00' },
                end: { dateTime: '2030-05-21T18:00:00+03:00' },
            },
        ];

        it('The slot from 17 - 18 should be filtered', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['11', '12'],
                ['12', '13'],
                ['13', '14'],
                ['14', '15'],
                ['15', '16'],
                ['16', '17'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
                ['21', '22'],
                ['22', '23'],
            ]);
        });
    });
    describe('Checking the event that occupies the last schedule interval', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T22:00:00+03:00' },
                end: { dateTime: '2030-05-21T23:00:00+03:00' },
            },
        ];

        it('The slot from 22 - 23 should be filtered', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['11', '12'],
                ['12', '13'],
                ['13', '14'],
                ['14', '15'],
                ['15', '16'],
                ['16', '17'],
                ['17', '18'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
                ['21', '22'],
            ]);
        });
    });
    describe('Checking when an event falls within the schedule interval even for a minute', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T11:00:00+03:00' },
                end: { dateTime: '2030-05-21T12:01:00+03:00' },
            },
        ];

        it('The slot from 11 - 12, 12 - 13 should be filtered', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['13', '14'],
                ['14', '15'],
                ['15', '16'],
                ['16', '17'],
                ['17', '18'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
                ['21', '22'],
                ['22', '23'],
            ]);
        });
    });
    describe('Checking when an event completely overlaps all schedule intervals', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T09:00:00+03:00' },
                end: { dateTime: '2030-05-22T00:00:00+03:00' },
            },
        ];

        it('All slots must be filtered', () => {
            expect(getAvailableSlots(date, events)).toEqual([]);
        });
    });
    describe('Checking when the event interval spans several days and is part of the selected day', () => {
        const events = [
            {
                start: { dateTime: '2030-05-18T11:00:00+03:00' },
                end: { dateTime: '2030-05-21T15:00:00+03:00' },
            },
        ];

        it('Slots from 11 - 15 hours of the schedule should be filtered', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['15', '16'],
                ['16', '17'],
                ['17', '18'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
                ['21', '22'],
                ['22', '23'],
            ]);
        });
    });
    describe('Checking when the event interval spans several days and is part of the selected day', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T11:00:00+03:00' },
                end: { dateTime: '2030-05-21T12:00:00+03:00' },
            },
            {
                start: { dateTime: '2030-05-21T13:00:00+03:00' },
                end: { dateTime: '2030-05-21T14:00:00+03:00' },
            },
            {
                start: { dateTime: '2030-05-21T21:00:00+03:00' },
                end: { dateTime: '2030-05-21T22:05:00+03:00' },
            },
        ];

        it('Slots from 11 - 12, 13 - 14, 21 - 23 hours of the schedule should be filtered', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['12', '13'],
                ['14', '15'],
                ['15', '16'],
                ['16', '17'],
                ['17', '18'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
            ]);
        });
    });
    describe('Check when time zone -03:00 is used', () => {
        const events = [
            {
                start: { dateTime: '2030-05-21T11:00:00-03:00' },
                end: { dateTime: '2030-05-21T12:00:00-03:00' },
            },
            {
                start: { dateTime: '2030-05-21T13:00:00-03:00' },
                end: { dateTime: '2030-05-21T14:00:00-03:00' },
            },
            {
                start: { dateTime: '2030-05-21T21:00:00-03:00' },
                end: { dateTime: '2030-05-21T22:05:00-03:00' },
            },
        ];

        it('Slots from 11 - 12, 13 - 14, 21 - 23 hours of the schedule should be filtered whth timezone -03:00', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['12', '13'],
                ['14', '15'],
                ['15', '16'],
                ['16', '17'],
                ['17', '18'],
                ['18', '19'],
                ['19', '20'],
                ['20', '21'],
            ]);
        });
    });

    describe.skip('When the date is today and current time is 20:00', () => {
        const date = dayjs().hour(20).format('YYYY-MM-DD');
        const events = [];

        it('Should adjust start time to current hour + 1 (21:00)', () => {
            expect(getAvailableSlots(date, events)).toEqual([
                ['21', '22'],
                ['22', '23'],
            ]);
        });
    });
});
