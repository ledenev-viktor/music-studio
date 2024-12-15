import { Variant } from 'framer-motion';
import cn from 'classnames';
import s from './CustomMenu.module.scss';

export const MenuToggle = ({
    toggle,
    classNameToggle,
}: {
    toggle: () => void;
    classNameToggle?: string;
}) => (
    <button
        className={cn(s.toggle, [classNameToggle])}
        aria-label="menu-button"
        onClick={toggle}
    >
        <svg width="23" height="18" viewBox="0 0 23 18">
            <Path
                d="M 2 2.5 L 20 2.5"
                className="top"
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
            <Path
                d="M 2 16.346 L 20 16.346"
                className="bottom"
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
            />
        </svg>
    </button>
);

const Path = (props: {
    variants?: { closed: Variant; open: Variant };
    d: string;
    opacity?: string;
    className?: string;
}) => (
    <path
        fill="transparent"
        strokeWidth="3"
        stroke="var(--background)"
        strokeLinecap="round"
        {...props}
    />
);
