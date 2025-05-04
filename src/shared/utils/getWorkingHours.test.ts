import { getWorkingHours } from './getWorkingHours';

it('must form a structure [["1", "2"]]', () => {
    expect(getWorkingHours(1, 2)).toEqual([['1', '2']]);
});
it('must generate an array of schedules from 11 to 23', () => {
    expect(getWorkingHours(11, 23)).toEqual([
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
it('should return an empty array if arg2 <= arg1', () => {
    expect(getWorkingHours(23, 11)).toEqual([]);
});
