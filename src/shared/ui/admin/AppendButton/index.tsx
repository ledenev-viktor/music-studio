import s from './AppendButton.module.scss';

export const AppendButton = ({ callback }: { callback: () => void }) => {
    return (
        <button className={s.button} onClick={callback}>
            +
        </button>
    );
};
