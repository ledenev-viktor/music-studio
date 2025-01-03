import Notes from '../../icons/notes.svg';
import Location from '../../icons/location.svg';
import Telegram from '../../icons/tg.svg';
import Close from '../../icons/close.svg';
import BrokenDrumstick from '../../icons/brokenDrumstick.svg';

export const iconsMap = {
    notes: Notes,
    location: Location,
    telegram: Telegram,
    close: Close,
    brokenDrumstick: BrokenDrumstick,
};

export type TIconMapKeys = keyof typeof iconsMap;
