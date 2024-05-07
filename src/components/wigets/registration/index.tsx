import { FC } from 'react';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { FormComponent } from './component';

type RegistrationFormProps = {
    className?: string;
};
const RegistrationForm: FC<RegistrationFormProps> = () => {
    const defaultValues = {
        date: '',
        userName: '',
        userNameTelegram: '',
        timeSlotEvent: [],
        comment: '',
    };

    const form = useForm<FieldValues>({
        defaultValues,
        mode: 'onChange',
    });

    const { reset } = form;

    const onSubmit = (data: FieldValues) => {
        console.log('data', data);
        reset();
    };

    return (
        <FormProvider {...form}>
            <FormComponent onSubmit={onSubmit} />
        </FormProvider>
    );
};

export default RegistrationForm;
