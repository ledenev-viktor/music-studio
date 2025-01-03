import Notes from '../../icons/notes.svg';
import Location from '../../icons/location.svg';
import Telegram from '../../icons/tg.svg';
import Close from '../../icons/close.svg';

export const iconsMap = {
    notes: Notes,
    location: Location,
    telegram: Telegram,
    close: Close,
};

export type TIconMapKeys = keyof typeof iconsMap;
