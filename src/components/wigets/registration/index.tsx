import { useEffect } from 'react';
import { Flex } from 'antd';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import {
    FormInput,
    FormTextarea,
    FieldWrapper,
    TimeSlots,
    Btn,
} from '~components/ui/hook-form';
import { FormLayout } from './layouts/form-layout';
import { timeslots } from './mock/timeslots';

const RegistrationForm = () => {
    const defaultValues = {
        userName: '',
        userNameTelegram: '',
        timeSlotEvent: [],
        comment: '',
    };

    const form = useForm<FieldValues>({
        defaultValues,
        mode: 'onChange',
    });

    const { handleSubmit, control, watch, setValue } = form;

    const onSubmit = (data: FieldValues) => {
        console.log('data', data);
    };

    const dateEventWatch = watch('dateEvent');

    useEffect(() => {
        setValue('timeSlotEvent', '');
    }, [dateEventWatch, setValue]);

    return (
        <FormLayout title="Registration form">
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldWrapper label="Available timeslots">
                        <TimeSlots
                            name="timeSlotEvent"
                            timeslots={timeslots}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This field is required',
                                },
                            }}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Full Name">
                        <FormInput
                            name="userName"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This field is required',
                                },
                            }}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Telegram Username">
                        <FormInput
                            name="userNameTelegram"
                            control={control}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This field is required',
                                },
                            }}
                        />
                    </FieldWrapper>
                    <FieldWrapper label="Comment">
                        <FormTextarea
                            name="comment"
                            control={control}
                            placeholder="Indicate additional instruments that will be required for rehearsal"
                        />
                    </FieldWrapper>
                    <Flex>
                        <Btn htmlType="submit">Submit</Btn>
                    </Flex>
                </form>
            </FormProvider>
        </FormLayout>
    );
};

export default RegistrationForm;
