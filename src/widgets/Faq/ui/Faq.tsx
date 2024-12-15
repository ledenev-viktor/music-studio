import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import s from './style.module.scss';

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: (
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur voluptatibus adipisci qui hic deleniti id nam provident
                sapiente doloribus reprehenderit!
            </p>
        ),
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: (
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                praesentium accusamus doloribus, nobis voluptas provident velit
                veniam obcaecati commodi modi ipsam? Dolor autem, optio officia
                alias amet esse eum excepturi! Id esse praesentium fuga eveniet
                animi! Rerum architecto laudantium enim dicta consectetur
                tenetur dolor voluptatum eos provident? Harum, modi numquam.
            </p>
        ),
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: (
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, minus harum! Fugit omnis laudantium et saepe officia,
                doloremque corrupti laborum.
            </p>
        ),
    },
    {
        key: '4',
        label: 'This is panel header 3',
        children: (
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, minus harum! Fugit omnis.
            </p>
        ),
    },
    {
        key: '5',
        label: 'This is panel header 3',
        children: (
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, minus harum! Fugit omnis laudantium et saepe officia,
                doloremque corrupti laborum.
            </p>
        ),
    },
    {
        key: '6',
        label: 'This is panel header 3',
        children: (
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, minus harum!
            </p>
        ),
    },
];

export const FaqWidget = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
    };
    return (
        <div className={s.wrapper}>
            <div>
                <h2 className={s.title}>Частые вопросы</h2>
            </div>

            <Collapse
                className={s.collapse}
                items={items}
                onChange={onChange}
            />
        </div>
    );
};
