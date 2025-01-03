import s from './Team.module.scss';
import { Person } from './Person';

const teamData = [
    {
        id: 1,
        name: 'Олег Олегов',
        position: 'Большой бос',
        image: '/person.jpg',
    },
    {
        id: 2,
        name: 'Олег Олегов',
        position: 'Рук',
        image: '/person.jpg',
        chief: true,
    },
    {
        id: 3,
        name: 'Олег Олегов',
        position: 'Большой бос',
        image: '/person.jpg',
    },
    {
        id: 4,
        name: 'Олег Олегов',
        position: 'Большой бос',
        image: '/person.jpg',
    },
    {
        id: 5,
        name: 'Олег Олегов',
        position: 'Большой бос',
        image: '/person.jpg',
    },
];

export const TeamList = () => {
    return (
        <div className={s.teamWrapper}>
            {teamData?.map((item) => <Person key={item.id} {...item} />)}
        </div>
    );
};
