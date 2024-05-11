import { FC } from 'react';
import styled from '@emotion/styled';
import { Input as InputAntD, InputProps, Flex, Typography } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { BREAKPOINTS } from '~constants/breakpoints';

type FormInputBaseProps = {
    className?: string;
    label?: string;
} & InputProps &
    UseControllerProps;

const FormInputBase: FC<FormInputBaseProps> = ({
    name,
    label,
    rules,
    defaultValue = '',
    id,
    control,
    className,
    ...props
}) => {
    const { Text } = Typography;
    const { field, fieldState } = useController({
        name,
        rules,
        defaultValue,
        control,
    });
    const error = fieldState.error ? fieldState.error.message : '';
    const status = error ? 'error' : '';

    return (
        <Flex className={className} vertical>
            {label && <Text className="label">{label}</Text>}
            <InputAntD
                {...field}
                {...props}
                status={status}
                id={id || name}
                onChange={(e) => {
                    field.onChange(e);
                    props.onChange?.(e);
                }}
                onBlur={(e) => {
                    field.onBlur();
                    props.onBlur?.(e);
                }}
            />
            {error && (
                <Text style={{ marginTop: '10px' }} type="danger">
                    {error}
                </Text>
            )}
        </Flex>
    );
};

export const FormInput = styled(FormInputBase)`
    margin: 0 0 30px;
    width: 100%;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        margin: 0 0 20px;
    }

    .label {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400;
    }
    input {
        height: 40px;
        font-size: 16px;
    }
`;
