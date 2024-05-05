import { FC } from 'react';
import styled from '@emotion/styled';
import { Input as InputAntD, InputProps, Flex, Typography } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';

type FormInputProps = {
    className?: string;
} & InputProps &
    UseControllerProps;

export const _FormInput: FC<FormInputProps> = ({
    name,
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
            {error && <Text type="danger">{error}</Text>}
        </Flex>
    );
};

export const FormInput = styled(_FormInput)`
    input {
        height: 40px;
        font-size: 16px;
    }
`;
