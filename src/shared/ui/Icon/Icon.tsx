import { CSSProperties } from 'react';
import { iconsMap, TIconMapKeys } from './IconMap';

export interface IconProps {
    name: TIconMapKeys;
    size?: number | string;
    height?: number | string;
    className?: string;
    fill?: string;
    style?: CSSProperties;
}

export const Icon = ({
    name,
    size = 24,
    height,
    className,
    fill,
    style,
}: IconProps) => {
    const IconComponent = iconsMap[name];

    return (
        <IconComponent
            style={{ width: size, height: height || size, fill, ...style }}
            className={className}
        />
    );
};
