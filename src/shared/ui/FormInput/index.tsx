import { FC } from 'react';
import { Input as InputAntD, InputProps, Flex } from 'antd';
import {
    useController,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import s from './Input.module.scss';

type FormInputBaseProps = {
    className?: string;
    label?: string;
} & InputProps &
    UseControllerProps;

export const FormInput: FC<FormInputBaseProps> = ({
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
        <Flex className={cn(s.wrapper, className)} vertical>
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
