export const getWorkingHours = (startHour: number, endHour: number) => {
    if (endHour <= startHour) return [];
    const result = [];

    for (let hour = startHour; hour < endHour; hour++) {
        result.push([String(hour), String(hour + 1)]);
    }

    return result;
};
