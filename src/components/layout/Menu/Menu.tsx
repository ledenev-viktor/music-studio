import * as React from 'react';
import { useEffect, useRef } from 'react';
import { motion, useCycle } from 'framer-motion';
import { Hamburger } from './Hamburger';

const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.offsetHeight;
    }, []);

    return dimensions.current;
};

const sidebarVariants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at calc(100% - 30px) 30px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(25px at calc(100% - 30px) 30px)',
        transition: {
            // delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const listVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const listItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};
const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];
export const Menu = () => {
    // const { t } = useTranslation();
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    // const menuItems = [
    //     {
    //         text: t('header_menu_home'),
    //         path: '/home',
    //         key: 1,
    //     },
    //     {
    //         text: t('header_menu_application'),
    //         path: '/application',
    //         key: 2,
    //     },
    //     {
    //         text: t('header_menu_contacts'),
    //         path: '/contacts',
    //         key: 3,
    //     },
    // ];

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            custom={height}
            ref={containerRef}
        >
            <motion.div className="background" variants={sidebarVariants} />
            <motion.ul variants={listVariants}>
                {[1, 2, 3, 5].map((i) => {
                    const style = { border: `2px solid ${colors[i]}` };
                    return (
                        <motion.li
                            key={i}
                            variants={listItemVariants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="icon-placeholder" style={style} />
                            <div className="text-placeholder" style={style} />
                        </motion.li>
                    );
                })}
            </motion.ul>
            <Hamburger
                onToggle={() => {
                    console.log('toggled');
                    toggleOpen();
                }}
            />
        </motion.nav>
    );
};
