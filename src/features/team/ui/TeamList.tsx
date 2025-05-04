import { TeamFields } from '~types/team';
import s from './Team.module.scss';
import { Person } from './Person';

export type TeamFieldsWithId = { id: number } & TeamFields;

export const TeamList = ({ items }: { items: TeamFieldsWithId[] }) => {
    console.log('items', items);
    return (
        <div className={s.teamWrapper}>
            {items?.map((item, index) => (
                <Person
                    {...item}
                    key={item.id}
                    chief={item?.chief ?? index === 0}
                />
            ))}
        </div>
    );
};
