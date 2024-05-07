import { FC } from 'react';
import { Flex, Typography } from 'antd';
import { useFormContext, FieldValues } from 'react-hook-form';
import styled from '@emotion/styled';
import moment from 'moment';
import {
    FormDatePicker,
    FormInput,
    FormTextarea,
    TimeSlots,
    Button,
} from '~components/ui/hook-form';
import { timeslots } from './mock/timeslots';

type RegFormBaseProps = {
    className?: string;
    onSubmit: (data: FieldValues) => void;
};

export const FormComponentBase: FC<RegFormBaseProps> = ({
    className,
    onSubmit,
}) => {
    const { Title } = Typography;
    const { handleSubmit, control } = useFormContext();

    return (
        <form className={className} onSubmit={handleSubmit(onSubmit)}>
            <Title level={2}>Registration form</Title>
            <FormDatePicker
                name="date"
                placeholder=""
                label="Select date"
                disabledDate={(current) =>
                    current && current < moment().startOf('day')
                }
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required',
                    },
                }}
            />
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
                <Button htmlType="submit">Submit</Button>
            </Flex>
        </form>
    );
};

export const FormComponent = styled(FormComponentBase)`
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 60px 60px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px -14px rgba(0, 0, 0, 1);
    border-radius: 15px;

    h2 {
        margin: 0 0 30px;
    }

    @media screen and (max-width: 767px) {
        padding: 20px;
        h2 {
            margin: 0 0 20px;
        }
    }
`;
