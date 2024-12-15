import { FC } from 'react';
import { Input, Flex } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

type FormTextareaBaseProps = {
    className?: string;
    label?: string;
} & TextAreaProps &
    UseControllerProps;

export const FormTextarea: FC<FormTextareaBaseProps> = ({
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
