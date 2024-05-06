import { FC } from 'react';
import { Flex, Typography } from 'antd';
import { useFormContext, FieldValues } from 'react-hook-form';
import styled from '@emotion/styled';
import {
    FormInput,
    FormTextarea,
    TimeSlots,
    Btn,
} from '~components/ui/hook-form';
import { timeslots } from './mock/timeslots';

type RegFormBaseProps = {
    className?: string;
    onSubmit: (data: FieldValues) => void;
};

export const RegFormBase: FC<RegFormBaseProps> = ({ className, onSubmit }) => {
    const { Title } = Typography;
    const { handleSubmit, control } = useFormContext();

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            <Title level={2}>Registration form</Title>
            <TimeSlots
                name="timeSlotEvent"
                label="Available timeslots"
                timeslots={timeslots}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />
            <FormInput
                name="userName"
                label="Full Name"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />
            <FormInput
                name="userNameTelegram"
                label="Telegram Username"
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />
            <FormTextarea
                name="comment"
                label="Comment"
                control={control}
                placeholder="Indicate additional instruments that will be required for rehearsal"
            />
            <Flex>
                <Btn htmlType="submit">Submit</Btn>
            </Flex>
        </form>
    );
};

export const RegForm = styled(RegFormBase)`
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 60px 60px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px -14px rgba(0, 0, 0, 1);
    border-radius: 15px;
    @media screen and (max-width: 767px) {
        padding: 20px;
    }
`;
