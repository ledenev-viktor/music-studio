import { TeamList } from '~features/team';
import { Title } from '~shared/ui';
import s from './TeamWidget.module.scss';

export const TeamWidget = () => {
    return (
        <div className={s.wrapper}>
            <Title>Наша команда</Title>
            <TeamList />
        </div>
    );
};
