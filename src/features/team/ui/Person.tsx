import cn from 'classnames';
import Image from 'next/image';
import s from './Team.module.scss';

export const Person = ({
    name,
    position,
    image,
    chief,
}: {
    name: string;
    position: string;
    image: string;
    chief?: boolean;
}) => (
    <div
        className={cn(s.person, {
            [s.chief]: chief,
        })}
    >
        <div className={s.imgbox}>
            <Image
                width={500}
                height={500}
                className={s.img}
                src={image}
                alt={name}
                layout="responsive"
            />
        </div>
        <div>
            <div className={s.personName}>{name}</div>
            <p className={s.personPosition}>{position}</p>
        </div>
    </div>
);
