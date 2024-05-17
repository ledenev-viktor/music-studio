// react-canvas-confetti.d.ts
declare module 'react-canvas-confetti' {
    import { ReactNode } from 'react';

    interface TReactCanvasConfettiProps {
        refConfetti?: (instance: any) => void; // Adjust the type of `instance` as needed
        style?: React.CSSProperties;
        className?: string;
        width?: number | string;
        height?: number | string;
        globalOptions?: any; // Adjust the type as needed
        onInit?: (instance: any) => void; // Adjust the type of `instance` as needed
    }

    export default function ReactCanvasConfetti(
        props: TReactCanvasConfettiProps,
    ): ReactNode;
}
