import React from 'react';
import { motion } from 'framer-motion';
import { Flex } from 'antd';
import { useScreenDetector } from '~hooks/responsive';
import { COLORS } from '~variables';
import { CardContent } from './CardContent';

const ContactsPage = () => {
    const { isMobile, isSmallMobile, isDesktop } = useScreenDetector();
    const finalWidth = window.innerWidth * 0.7;
    const finalHeight = !isDesktop
        ? window.innerHeight * 0.75
        : window.innerHeight * 0.95;
    const praktika = 'ráktika'.split('');

    return (
        <Flex
            vertical
            style={{
                height: '100vh',
                background: COLORS.blue,
                padding: isMobile || isSmallMobile ? '10% 15%' : '5% 15%',
            }}
        >
            <motion.div
                animate={{
                    y: [finalHeight / 3, 0],
                    transition: {
                        duration: 0.3,
                        delay: 1,
                    },
                }}
            >
                <motion.img
                    src={'/logo2.png'}
                    key="image"
                    style={{
                        width: isMobile
                            ? '60px'
                            : isSmallMobile
                              ? '50px'
                              : '80px',
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
                            fontSize: isMobile
                                ? '64px'
                                : isSmallMobile
                                  ? '48px'
                                  : '96px',
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
            <motion.div
                initial={{ opacity: 0 }}
                style={{
                    background: 'white',
                    height: finalHeight,
                    width: finalWidth,
                    borderRadius: isMobile || isSmallMobile ? '8px' : '16px',
                    boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px,
                        rgba(0, 0, 0, 0.12) 0px -12px 30px,
                        rgba(0, 0, 0, 0.12) 0px 4px 6px,
                        rgba(0, 0, 0, 0.17) 0px 12px 13px,
                        rgba(0, 0, 0, 0.09) 0px -3px 5px`,
                }}
                animate={{
                    opacity: [0, 1],
                    transition: {
                        duration: 1,
                        delay: 1.3,
                    },
                }}
            >
                <CardContent />
            </motion.div>
        </Flex>
    );
};

export default ContactsPage;
