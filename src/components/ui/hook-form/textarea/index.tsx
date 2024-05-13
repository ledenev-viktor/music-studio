import { FC } from 'react';
import { Input, Flex, Typography } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useController, UseControllerProps } from 'react-hook-form';
import styled from '@emotion/styled';
import { BREAKPOINTS } from '~constants/breakpoints';

type FormTextareaBaseProps = {
    className?: string;
    label?: string;
} & TextAreaProps &
    UseControllerProps;

export const FormTextareaBase: FC<FormTextareaBaseProps> = ({
    name,
    label,
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
            {label && <Text className="label">{label}</Text>}
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
            {error && (
                <Text style={{ marginTop: '10px' }} type="danger">
                    {error}
                </Text>
            )}
        </Flex>
    );
};

export const FormTextarea = styled(FormTextareaBase)`
    margin: 0 0 30px;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        margin: 0 0 20px;
    }

    .label {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400;
    }
    textarea {
        resize: none;
        min-height: 100px;
        font-size: 16px;

        &::placeholder {
            font-size: 18px;
        }
        @media screen and (max-width: ${BREAKPOINTS.mobile}) {
            &::placeholder {
                font-size: 16px;
            }
        }
    }
`;
