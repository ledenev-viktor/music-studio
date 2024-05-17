import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { motion } from 'framer-motion';

export const Label = styled(Typography.Text)`
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 400;
`;

const transition = { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] };

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition }}
            exit={{
                opacity: 0,
                y: -10,
                transition: { duration: 1, delay: 0.3 },
            }}
            key="logoText"
        >
            <Typography.Text style={{ color: 'red' }}>
                {children}
            </Typography.Text>
        </motion.span>
    );
};
