import React, { ReactNode, createContext, useContext } from 'react';
import { Modal } from 'antd';

const ModalContext = createContext<{ modal: any }>({ modal: undefined });

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modal, contextHolder] = Modal.useModal();

    return (
        <ModalContext.Provider value={{ modal }}>
            {contextHolder}
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}
