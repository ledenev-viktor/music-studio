import { FC } from 'react';
import { SwitchProps as SwitchBaseProps, Flex, Switch, Typography } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';

type SwitchProps = {
    className?: string;
    label?: string;
} & SwitchBaseProps &
    UseControllerProps;

export const FormSwitch: FC<SwitchProps> = ({
    name,
    label,
    rules,
    defaultValue = '',
    control,
    className,
}) => {
    const { field } = useController({
        name,
        rules,
        defaultValue,
        control,
    });

    return (
        <Flex className={className} gap={10} align="center">
            <Switch title={name} {...field} />
            <Typography.Text
                style={{
                    fontSize: '18px',
                    fontWeight: '400',
                }}
            >
                {label}
            </Typography.Text>
        </Flex>
    );
};
