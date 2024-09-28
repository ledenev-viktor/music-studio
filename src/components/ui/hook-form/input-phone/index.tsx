import {
    PhoneInput,
    PhoneInputProps,
    defaultCountries,
    parseCountry,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import styled from '@emotion/styled';
import { Flex } from 'antd';
import {
    UseControllerProps,
    useController,
    useFormContext,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { COLORS } from '~variables';
import { ErrorMessage, Label } from '../common';

type InputPhoneProps = {
    className?: string;
    label?: string;
    listCountries?: string[];
} & PhoneInputProps &
    UseControllerProps;

const InputPhoneBase = ({
    name,
    label,
    rules,
    defaultValue = '',
    listCountries = [],
    className,
    ...props
}: InputPhoneProps) => {
    const { control, trigger } = useFormContext();
    const { field, fieldState } = useController({
        name,
        defaultValue,
        control,
        rules,
    });
    const error = fieldState.error ? fieldState.error.message : '';

    const countries = defaultCountries.filter((country) => {
        const { iso2 } = parseCountry(country);
        return listCountries.length > 0
            ? listCountries.slice().includes(iso2)
            : [];
    });

    return (
        <Flex className={cn(className, { error: fieldState.error })} vertical>
            <AnimatePresence mode="wait" initial={false}>
                {label && <Label>{label}</Label>}
                <PhoneInput
                    {...field}
                    {...props}
                    defaultCountry="ge"
                    countries={countries}
                    className={cn('inputPhone', { error: fieldState.error })}
                    onChange={(e) => {
                        field.onChange(e);
                        // props.onChange?.(e);
                    }}
                    onBlur={(e) => {
                        trigger(name);
                        field.onBlur();
                        props.onBlur?.(e);
                    }}
                />
                {error && <ErrorMessage motionId={name}>{error}</ErrorMessage>}
            </AnimatePresence>
        </Flex>
    );
};

export const InputPhone = styled(InputPhoneBase)`
    .inputPhone {
        & .react-international-phone-country-selector-button {
            border: 1px solid ${COLORS.blue};
            height: 40px;
            border-radius: 6px 0 0 6px;
            padding: 6px;
        }
        & .react-international-phone-input {
            flex-grow: 2;
            border: 1px solid ${COLORS.blue};
            height: 40px;
            border-radius: 0 6px 6px 0;
        }
        &.error {
            & .react-international-phone-country-selector-button {
                border: 1px solid ${COLORS.red};
            }
            & .react-international-phone-input {
                flex-grow: 2;
                border: 1px solid ${COLORS.red};
            }
        }
    }
`;
