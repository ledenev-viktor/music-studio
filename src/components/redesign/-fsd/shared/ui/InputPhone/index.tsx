import { useEffect, useState } from 'react';
import { PhoneInput, PhoneInputProps } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Flex } from 'antd';
import {
    UseControllerProps,
    useController,
    useFormContext,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import { countries } from './countries';
import s from './InputPhone.module.scss';

type InputPhoneProps = {
    className?: string;
    label?: string;
    listCountries?: string[];
} & PhoneInputProps &
    UseControllerProps;

export const InputPhone = ({
    name,
    label,
    defaultValue = '',
    className,
    ...props
}: InputPhoneProps) => {
    const { t } = useTranslation();
    const [mask, setMask] = useState<string>('');
    const [phoneMeta, setPhoneMeta] = useState<{ iso: string; code: string }>({
        iso: '',
        code: '',
    });

    const { control } = useFormContext();
    const { field, fieldState } = useController({
        name,
        defaultValue,
        control,
        rules: {
            validate: (value) => {
                const { code } = phoneMeta;
                const codeSymCount = code.length + 1;
                const numberCount = mask?.replace(/ /g, '').length;

                if (value.length === codeSymCount) {
                    return t('required_filed');
                }
                return (
                    value.length >= codeSymCount + numberCount ||
                    t('enter_correct_number')
                );
            },
        },
    });
    const error = fieldState.error ? fieldState.error.message : '';

    useEffect(() => {
        switch (phoneMeta?.iso) {
            case 'ge':
                setMask('.. ... .. ..');
                break;
            case 'ru':
                setMask('... ... .. ..');
                break;
            default:
                setMask('');
        }
    }, [phoneMeta?.iso]);

    return (
        <Flex className={cn(className, { error: fieldState.error })} vertical>
            <AnimatePresence mode="wait" initial={false}>
                {label && <Label>{label}</Label>}
                <PhoneInput
                    {...field}
                    {...props}
                    defaultMask={mask}
                    forceDialCode={true}
                    defaultCountry="ge"
                    countries={countries}
                    className={cn(s.inputPhone, { error: fieldState.error })}
                    onChange={(e, data) => {
                        const { iso2, dialCode } = data.country;
                        setPhoneMeta({ iso: iso2, code: dialCode });
                        field.onChange(e);
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
