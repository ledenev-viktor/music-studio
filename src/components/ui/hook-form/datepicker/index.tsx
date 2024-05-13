import styled from '@emotion/styled';
import { DatePicker as DatePickerAntD, DatePickerProps, Flex } from 'antd';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { ErrorMessage, Label } from '../common';

type FormDatePickerBaseProps = {
    className?: string;
    label?: string;
} & DatePickerProps &
    UseControllerProps;

export function FormDatePickerBase({
    name,
    label,
    className,
    rules,
    defaultValue = '',
    id,
    ...props
}: FormDatePickerBaseProps) {
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
            <DatePickerAntD
                {...field}
                {...props}
                status={status}
                id={id || name}
                onChange={(e) => {
                    field.onChange(e);
                }}
                onBlur={() => {
                    field.onBlur();
                }}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Flex>
    );
}

export const FormDatePicker = styled(FormDatePickerBase)`
    .ant-picker {
        height: 40px;
    }

    input {
        font-size: 16px;
    }
`;
