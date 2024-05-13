import styled from '@emotion/styled';
import {
    DatePicker as DatePickerAntD,
    DatePickerProps,
    Flex,
    Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { BREAKPOINTS } from '~constants/breakpoints';

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
    control,
    ...props
}: FormDatePickerBaseProps) {
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
            {error && (
                <Text style={{ marginTop: '10px' }} type="danger">
                    {error}
                </Text>
            )}
        </Flex>
    );
}

export const FormDatePicker = styled(FormDatePickerBase)`
    margin: 0 0 30px;

    .label {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400;
    }

    .ant-picker {
        height: 40px;
    }

    input {
        font-size: 16px;
    }

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        margin: 0 0 20px;
    }
`;
