import { Button } from 'antd';
import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { createValidObject } from './validation';
import { FormInput } from '~components/hookForm';

export const RegistrationForm = () => {
    const defaultValues = {
        userName: '',
    };

    // const yupSchema = yup.object().shape(createValidObject(fields));

    const form = useForm({
        defaultValues,
        mode: 'onChange',
        // resolver: yupResolver(yupSchema),
    });
    const { handleSubmit } = form;

    const onSubmit = (data: unknown) => {
        console.log('data', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                name="userName"
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />

            <Button htmlType="submit">Submit</Button>
        </form>
    );
};
