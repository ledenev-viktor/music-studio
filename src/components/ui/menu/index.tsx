import styled from '@emotion/styled';
import { Menu as MenuAntd, MenuProps } from 'antd';
import { COLORS } from 'src/styles/variables';

export const MenuBase = ({ className, ...props }: MenuProps) => {
    return (
        <div className={className}>
            <MenuAntd {...props} />
        </div>
    );
};

const { white, pink } = COLORS;
export const Menu = styled(MenuBase)`
    .ant-menu-vertical.ant-menu-light {
        .ant-menu-item {
            font-size: 18px;
            height: 30px;
            line-height: 30px;
            &:hover,
            &-selected {
                color: ${pink};
                background: none;
            }
        }
    }
    .ant-menu-horizontal.ant-menu-light {
        height: 100%;
        align-items: center;
        justify-content: flex-end;
        background: none;
        border: none;

        .ant-menu-item {
            color: ${white};
            font-size: 20px;
            font-weight: 500;
            &:after {
                opacity: 0;
            }

            &:hover,
            &-selected {
                color: ${pink};
            }
        }
    }
`;
