import cn from 'classnames';
import Image from 'next/image';
import s from './Team.module.scss';

export const Person = ({
    name,
    desc,
    img,
    chief,
}: {
    name: string;
    desc: string;
    img: string;
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
                src={img}
                alt={name}
                layout="responsive"
            />
        </div>
        <div>
            <div className={s.personName}>{name}</div>
            <p className={s.personPosition}>{desc}</p>
        </div>
    </div>
);
