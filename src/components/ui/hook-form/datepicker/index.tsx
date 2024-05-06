import styled from '@emotion/styled';
import {
    DatePicker as DatePickerAntD,
    DatePickerProps,
    Flex,
    Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';

type DatePickerBaseProps = {
    className?: string;
    label?: string;
} & DatePickerProps &
    UseControllerProps;

export function DatePickerBase({
    name,
    label,
    className,
    rules,
    defaultValue = '',
    id,
    control,
    ...props
}: DatePickerBaseProps) {
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
            {label && <Text>{label}</Text>}
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
            {error && <Text type="danger">{error}</Text>}
        </Flex>
    );
}

export const DatePicker = styled(DatePickerBase)`
    margin: 0 0 40px;

    @media screen and (max-width: 767px) {
        margin: 0 0 20px;
    }
`;
