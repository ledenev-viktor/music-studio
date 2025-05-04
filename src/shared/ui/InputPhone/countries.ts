import { defaultCountries, parseCountry } from 'react-international-phone';

export const countries = defaultCountries.filter((country) => {
    const { iso2 } = parseCountry(country);
    return ['ge', 'ru'].slice().includes(iso2);
});
