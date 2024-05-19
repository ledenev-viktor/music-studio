import { getOffsetUTCFromStringDate } from './getOffsetUTCFromStringDate';

it('should return an empty string if there is no pattern match UTC', () => {
    expect(getOffsetUTCFromStringDate('')).toBe('');
});

it('Should return the UTC that is used in the string', () => {
    expect(getOffsetUTCFromStringDate('2024-05-21T11:00:00+04:00')).toBe(
        '+04:00',
    );
});
