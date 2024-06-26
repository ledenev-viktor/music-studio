import React, { useRef, useEffect, ReactNode } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

export function Fancybox(props: {
    delegate?: string;
    options?: unknown;
    children: ReactNode;
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const delegate = props.delegate || '[data-fancybox]';
        const options = props.options || {};

        NativeFancybox.bind(container, delegate, options);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return <div ref={containerRef}>{props.children}</div>;
}
