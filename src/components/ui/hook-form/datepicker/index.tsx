import {
    DatePicker as DatePickerAntD,
    DatePickerProps,
    Flex,
    Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';

export function FormDatePicker({
    name,
    rules,
    defaultValue = '',
    id,
    control,
    ...props
}: DatePickerProps & UseControllerProps) {
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
        <Flex vertical>
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
