export function convertToAmPm(timeStr: string) {
    const [start, end] = timeStr.split(' - ');

    function convert(time: string) {
        const [hours, minutes] = time.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12;
        return `${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    }

    const startAmPm = convert(start);
    const endAmPm = convert(end);

    return `${startAmPm} - ${endAmPm}`;
}
