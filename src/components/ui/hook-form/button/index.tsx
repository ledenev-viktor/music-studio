import styled from '@emotion/styled';
import { Button as ButtonAntd } from 'antd';
import { COLORS } from 'src/styles/variables';

export const Button = styled(ButtonAntd)`
    background: ${COLORS.blue};
    padding: 5px 10px;
    min-width: 100px;
    box-sizing: content-box;
    color: ${COLORS.white};
    font-size: 16px;
`;
