import React from 'react';
import { motion } from 'framer-motion';

export const Logo = () => {
    const praktika = 'ráktika'.split('');

    return (
        <motion.div
            animate={{
                transition: {
                    duration: 0.3,
                    delay: 1,
                },
            }}
        >
            <motion.img
                src={'/logo.png'}
                alt="praktika-logo"
                key="image"
                style={{
                    width: '50px',
                }}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 1],
                    transition: {
                        duration: 0.1,
                    },
                }}
            />
            {praktika.map((el, i) => (
                <motion.span
                    style={{
                        fontSize: '48px',
                        color: '#efefe7',
                        fontWeight: 700,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.2,
                        delay: i / 10 + 0.15,
                    }}
                    key={i}
                >
                    {el}
                </motion.span>
            ))}
        </motion.div>
    );
};
