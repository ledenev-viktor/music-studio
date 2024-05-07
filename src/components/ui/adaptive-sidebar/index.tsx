import React, { ReactNode } from 'react';
import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import styled from '@emotion/styled';

type AdaptiveSidebarBaseProps = {
    className?: string;
    children: ReactNode;
} & DrawerProps;

export const AdaptiveSidebarBase = ({
    className,
    children,
    ...props
}: AdaptiveSidebarBaseProps) => {
    return (
        <Drawer className={className} {...props}>
            {children}
        </Drawer>
    );
};

export const AdaptiveSidebar = styled(AdaptiveSidebarBase)`
    .ant-drawer-body {
        padding: 20px 10px;
    }
`;
