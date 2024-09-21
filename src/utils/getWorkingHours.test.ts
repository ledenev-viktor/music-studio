import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getWorkingHours } from './getWorkingHours';

dayjs.extend(utc);
dayjs.extend(timezone);

const mockedDateNow = (mockDateNow: string) => {
    jest.spyOn(dayjs.prototype, 'tz').mockReturnValue(dayjs(mockDateNow));
    jest.spyOn(dayjs.prototype, 'format').mockReturnValue(
        dayjs(mockDateNow).format('YYYY-MM-DDTHH:mm:ss'),
    );
};

it('must generate an array of schedules from 14 to 23', () => {
    mockedDateNow('2024-05-20T13:00:00');

    expect(getWorkingHours(11, 23, '2024-05-20')).toEqual([
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

    jest.restoreAllMocks();
});
it('If there is less than an hour left until the slot, it should be removed from the array', () => {
    mockedDateNow('2024-05-20T10:00:01');

    expect(getWorkingHours(11, 23, '2024-05-20')).toEqual([
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

    jest.restoreAllMocks();
});
it('should return an empty array if arg2 <= arg1', () => {
    expect(getWorkingHours(23, 11, '2024-05-20')).toEqual([]);
});
