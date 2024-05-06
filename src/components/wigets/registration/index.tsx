import { FC, useState } from 'react';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { Flex, Typography } from 'antd';
import { TimeSlot } from './types/form';
import { RegForm } from './component';
import { ResultForm } from './result-form';
import { Btn } from '~components/ui/hook-form';

type RegistrationFormProps = {
    className?: string;
};
const RegistrationForm: FC<RegistrationFormProps> = () => {
    const [sent, setSent] = useState<FieldValues>({});

    const { Title } = Typography;

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

    const { reset } = form;

    const onSubmit = (data: FieldValues) => {
        console.log('data', data);
        setSent(data);
    };

    const handleSentOk = () => {
        setSent({});
        reset();
    };

    return Object.values(sent).length === 0 ? (
        <FormProvider {...form}>
            <RegForm onSubmit={onSubmit} />
        </FormProvider>
    ) : (
        <ResultForm>
            <Title level={2}>Data sent successfully</Title>
            <Flex style={{ padding: '0 0 20px' }}>
                Dear {sent.userName}, you have made an appointment for{' '}
                {sent.timeSlotEvent.length > 1
                    ? sent.timeSlotEvent
                          .map((event: TimeSlot) => event.label)
                          .join(' and ')
                    : sent.timeSlotEvent
                          .map((event: TimeSlot) => event.label)
                          .join('')}
                !
            </Flex>
            <Btn onClick={handleSentOk}>Ok</Btn>
        </ResultForm>
    );
};

export default RegistrationForm;
