import { DatePicker as DatePickerAntD, DatePickerProps, Flex } from 'antd';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import s from './Datepicker.module.scss';

type FormDatePickerBaseProps = {
    className?: string;
    label?: string;
} & DatePickerProps &
    UseControllerProps;

// TODO: currently is not used, but now we are using experimental datepicker, so let's leave it just in case
export function FormDatePicker({
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
        <Flex vertical className={cn(s.wrapper, className)}>
            <AnimatePresence mode="wait" initial={false}>
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
                {error && <ErrorMessage motionId={name}>{error}</ErrorMessage>}
            </AnimatePresence>
        </Flex>
    );
}
