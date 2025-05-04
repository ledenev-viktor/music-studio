import { Icon } from '~shared/ui';
import s from './CloseButton.module.scss';

export const CloseButton = ({ callback }: { callback: () => void }) => {
    return (
        <button className={s.closeButton} onClick={callback}>
            <Icon size={18} name="close" />
        </button>
    );
};
