import { FC } from 'react';
import styled from '@emotion/styled';
import { Input as InputAntD, InputProps, Flex } from 'antd';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { ErrorMessage, Label } from '../common';

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
    className,
    ...props
}) => {
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
        <Flex className={className} vertical>
            <AnimatePresence mode="wait" initial={false}>
                {label && <Label>{label}</Label>}
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
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </AnimatePresence>
        </Flex>
    );
};

export const FormInput = styled(FormInputBase)`
    width: 100%;
    input {
        height: 40px;
        font-size: 16px;
    }
`;
