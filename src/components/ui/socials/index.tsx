import styled from '@emotion/styled';
import { Menu } from 'antd';
import { COLORS } from 'src/styles/variables';

const { black, blue } = COLORS;
export const SocialsList = styled(Menu)`
    padding: 10px 0;
    &.ant-menu-light.ant-menu-vertical {
        border: none;
    }
    .ant-menu {
        &-item {
            display: flex;
            align-items: center;
        }
        &-title-content {
            font-size: 16px;
            color: ${black};
        }
    }

    .icon {
        line-height: 0;
        flex-shrink: 0;
        margin-right: 15px;
        width: 23px;
        height: 23px;
        color: ${blue};
    }
`;
