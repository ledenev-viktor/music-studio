import { Flex, Typography } from 'antd';
import { motion } from 'framer-motion';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next/types';
import { useTranslation } from 'react-i18next';
import { COLORS } from '~variables';
import { StyledLink } from '~components/ui/styled-link';

const svgVariants = {
    hidden: { rotate: 0 },
    visible: {
        rotate: 0,
        transition: { duration: 1 },
    },
};

const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0,
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
};

const DrumStick = () => (
    <svg
        width="292"
        height="70"
        viewBox="0 120 292 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            opacity="0.3"
            d="M11.0822 148.93C10.3011 138.807 141.559 131.145 141.559 131.145L128.77 136.452L141.526 143.081L129.632 144.085L143.144 147.992C143.144 147.992 12.7268 170.229 11.8284 158.594C11.0822 148.93 11.8278 158.593 11.0822 148.93Z"
            stroke="black"
            strokeWidth="3"
        />
        <path
            opacity="0.3"
            d="M154.822 130.866L172.314 131.43C172.314 131.43 245.495 152.022 246.898 151.793C248.302 151.563 255.049 148.195 261.548 149.334C268.339 150.524 271.836 154.046 270.539 159.15C269.316 163.963 264.374 167.465 255.962 166.016C247.838 164.616 245.056 159.895 243.328 159.352C241.599 158.81 165.695 146.01 165.695 146.01L153.162 137.618L166.946 140.068L154.822 130.866Z"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
        />
    </svg>
);

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ width: '100%', height: '100vh' }}
        >
            <motion.svg
                variants={svgVariants}
                initial="hidden"
                animate="visible"
                width="454"
                height="231"
                viewBox="0 0 454 231"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    d="M89.9778 228V9L11 156H136.089"
                    stroke="black"
                    stroke-width="5"
                    stroke-linecap="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                />
                <motion.path
                    d="M232.991 228C280.633 228 288 160.318 288 115.841C288 68.2426 280.633 9 232.991 9C183.063 9 177.001 71.0465 177 120.192C176.999 167.086 184.757 228 232.991 228Z"
                    stroke="black"
                    strokeWidth="5"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                />
                <motion.path
                    d="M404.659 228V9L327 156H450"
                    stroke="black"
                    strokeWidth="5"
                    strokeLinecap="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                />
            </motion.svg>
            <DrumStick />
            <Typography.Title level={3}>{t('404_title')}</Typography.Title>
            <StyledLink
                href="/"
                style={{
                    border: '1px solid black',
                    borderRadius: '8px',
                    padding: '10px 15px',
                    color: COLORS.black,
                }}
            >
                {t('header_menu_home')}
            </StyledLink>
        </Flex>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default NotFound;
