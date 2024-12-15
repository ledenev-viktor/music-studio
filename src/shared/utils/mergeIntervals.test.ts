import { mergeIntervals } from './mergeIntervals';

it('should return an empty array', () => {
    expect(mergeIntervals([])).toEqual([]);
});
it('should return one interval if passed an array with one interval', () => {
    const interval = [{ id: 0, value: '11-12', label: '11:00 - 12:00' }];
    expect(mergeIntervals(interval)).toEqual(interval);
});
it('must sort elements and combine consecutive intervals', () => {
    const intervals = [
        { id: 0, value: '15-16', label: '15:00 - 16:00' },
        { id: 1, value: '11-12', label: '11:00 - 12:00' },
        { id: 2, value: '12-13', label: '12:00 - 13:00' },
        { id: 3, value: '13-14', label: '13:00 - 14:00' },
        { id: 4, value: '14-15', label: '14:00 - 15:00' },
        { id: 5, value: '19-20', label: '19:00 - 20:00' },
    ];

    const result = [
        { id: 0, value: '11-16', label: '11:00 - 16:00' },
        { id: 1, value: '19-20', label: '19:00 - 20:00' },
    ];
    expect(mergeIntervals(intervals)).toEqual(result);
});
