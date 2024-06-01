import { FC } from 'react';
import {
    SwitchProps as SwitchBaseProps,
    Flex,
    Switch as SwitchAntd,
    Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from '@emotion/styled';
import { COLORS } from '~variables';

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

const Switch = styled(SwitchAntd)`
    &.ant-switch-checked:hover:not(.ant-switch-disabled) {
        &,
        & .ant-switch-inner {
            background: ${COLORS.blue};
        }
    }
`;
