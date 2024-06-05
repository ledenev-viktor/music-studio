import { FC } from 'react';
import styled from '@emotion/styled';
import { Input as InputAntD, InputProps, Flex } from 'antd';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { COLORS } from '~variables';
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
                {error && <ErrorMessage motionId={name}>{error}</ErrorMessage>}
            </AnimatePresence>
        </Flex>
    );
};

export const FormInput = styled(FormInputBase)`
    width: 100%;
    input {
        height: 40px;
        font-size: 16px;
        &:-internal-autofill-selected,
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            transition: background-color 999999s ease-in-out 0s;
            background: none;
        }
        &:-webkit-autofill::first-line {
            font-size: 16px;
            color: ${COLORS.black};
            letter-spacing: 0.05em;
            font-weight: 600;
        }
        &:-webkit-autofill {
            animation: onautofillstart 999999s forwards;
        }
        &:not(:-webkit-autofill) {
            animation: onautofillcancel 999999s;
        }

        &.ant-input-outlined {
            border-color: ${COLORS.blue};
        }
    }
`;
