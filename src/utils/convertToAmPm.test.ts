import { convertToAmPm } from './convertToAmPm';

it('should return an empty array', () => {
    expect(convertToAmPm('15:00 - 16:00')).toBe('3:00 PM - 4:00 PM');
    expect(convertToAmPm('3:00 - 4:00')).toBe('3:00 AM - 4:00 AM');
});
