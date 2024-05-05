import { FC } from 'react';
import { Input, Flex, Typography } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from '@emotion/styled';

type FormTextareaProps = {
    className?: string;
} & TextAreaProps &
    UseControllerProps;

export const _FormTextarea: FC<FormTextareaProps> = ({
    name,
    rules,
    defaultValue = '',
    id,
    control,
    className,
    ...props
}) => {
    const { TextArea } = Input;
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
        <Flex vertical className={className}>
            <TextArea
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

export const FormTextarea = styled(_FormTextarea)`
    textarea {
        resize: none;
        min-height: 100px;

        &::placeholder {
            font-size: 18px;
        }
    }
`;
