import { iconsMap, TIconMapKeys } from './IconMap';

export interface IconProps {
    name: TIconMapKeys;
    size?: number | string;
    height?: number | string;
    className?: string;
    fill?: string;
}

export const Icon = ({
    name,
    size = 24,
    height,
    className,
    fill,
}: IconProps) => {
    const IconComponent = iconsMap[name];

    return (
        <IconComponent
            style={{ width: size, height: height || size, fill }}
            className={className}
        />
    );
};
