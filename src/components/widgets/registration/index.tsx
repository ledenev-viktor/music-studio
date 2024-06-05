import { FC } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormFields } from '~types/appointments';
import { FormComponent } from './FormComponent';

type RegistrationFormProps = {
    className?: string;
};

export const RegistrationForm: FC<RegistrationFormProps> = () => {
    const defaultValues: FormFields = {
        date: '',
        userName: '',
        userNameTelegram: '',
        selectedTimeSlots: [],
        isCommentNeeded: false,
        additionEquipment: [],
        comment: '',
        weekStartDay: undefined,
    };

    const form = useForm<FormFields>({
        defaultValues,
        mode: 'onChange',
    });

    return (
        <FormProvider {...form}>
            <FormComponent />
        </FormProvider>
    );
};
