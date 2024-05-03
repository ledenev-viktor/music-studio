import React from 'react';
import { Input as InputAntD, InputProps, Flex, Typography } from 'antd';
import { useController } from 'react-hook-form';
import { HookFormProps } from '~types/hookForm';

export function FormInput({
    name,
    rules,
    defaultValue = '',
    id,
    ...props
}: InputProps & HookFormProps) {
    const { Paragraph } = Typography;
    const { field, fieldState } = useController({ name, rules, defaultValue });
    const error = fieldState.error ? fieldState.error.message : '';
    const status = error ? 'error' : '';

    return (
        <Flex vertical>
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
            <Paragraph>{error}</Paragraph>
        </Flex>
    );
}
