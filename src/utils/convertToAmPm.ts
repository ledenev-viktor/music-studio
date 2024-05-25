export function convertToAmPm(timeStr: string, withMinutes = false) {
    const [start, end] = timeStr.split(' - ');

    function convert(time: string, withMinutes: boolean) {
        const [hours, minutes] = time.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12;
        return withMinutes
            ? `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`
            : `${adjustedHours} ${ampm}`;
    }

    const startAmPm = convert(start, withMinutes);
    const endAmPm = convert(end, withMinutes);

    return `${startAmPm} - ${endAmPm}`;
}
