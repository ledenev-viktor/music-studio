import { FC } from 'react';
import { Input, Flex } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { COLORS } from '~variables';
import { ErrorMessage, Label } from '../common';
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
    className,
    ...props
}) => {
    const { TextArea } = Input;
    const { control } = useFormContext();
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
            {label && <Label>{label}</Label>}
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
            {error && <ErrorMessage motionId={name}>{error}</ErrorMessage>}
        </Flex>
    );
};

export const FormTextarea = styled(FormTextareaBase)`
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
        border-color: ${COLORS.blue};

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
