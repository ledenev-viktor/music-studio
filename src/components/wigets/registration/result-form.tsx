import { FC, ReactNode } from 'react';
import { Flex } from 'antd';
import styled from '@emotion/styled';

type ResultFormBaseProps = {
    className?: string;
    handleClick?: () => void;
    children: ReactNode;
};

const ResultFormBase: FC<ResultFormBaseProps> = ({ className, children }) => {
    return (
        <Flex className={className} vertical>
            {children}
        </Flex>
    );
};

export const ResultForm = styled(ResultFormBase)`
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 60px 60px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px -14px rgba(0, 0, 0, 1);
    border-radius: 15px;
    @media screen and (max-width: 767px) {
        padding: 20px;
    }
`;
