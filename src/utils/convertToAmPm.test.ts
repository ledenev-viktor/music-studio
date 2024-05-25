import { convertToAmPm } from './convertToAmPm';

it('should convert am/pm without :00', () => {
    expect(convertToAmPm('15:00 - 16:00')).toBe('3 PM - 4 PM');
    expect(convertToAmPm('3:00 - 4:00')).toBe('3 AM - 4 AM');
});
it('should convert am/pm', () => {
    expect(convertToAmPm('15:00 - 16:00', true)).toBe('3:00 PM - 4:00 PM');
    expect(convertToAmPm('3:00 - 4:00', true)).toBe('3:00 AM - 4:00 AM');
});
