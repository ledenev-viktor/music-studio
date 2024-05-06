import React, { ReactNode, createContext, useContext } from 'react';
import { notification } from 'antd';

const NotificationContext = createContext<{ toast: any }>({ toast: undefined });

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [api, contextHolder] = notification.useNotification({
        placement: 'bottom',
        bottom: 50,
        duration: 3,
    });

    return (
        <NotificationContext.Provider value={{ toast: api }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(NotificationContext);
}
