'use client';
import { Button, DatePicker, Form, Input, Radio } from 'antd';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { createValidObject } from './validation';
import { events } from './mock/events';
import { useFilterCalendarDate } from './hooks/filterCalendarDate';

export const FormEvents = () => {
    const fields: string[] = [
        'UserName',
        'UserNameTelegram',
        'CalendarDate',
        'TimeSlot',
    ];

    const yupSchema = yup.object().shape(createValidObject(fields));

    const form = useForm({
        defaultValues: {},
        mode: 'all',
        resolver: yupResolver(yupSchema),
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = form;

    const onSubmit = (data: unknown) => {
        console.log('data', data);
    };

    const createValidStatus = (errors: FieldErrors, fieldName: string) => {
        return errors[fieldName] ? 'error' : 'success';
    };

    const createMessageValid = (errors: FieldErrors, fieldName: string) => {
        const error = errors[fieldName];
        return error && typeof error.message === 'string' ? error.message : '';
    };

    const [filteredEvents] = useFilterCalendarDate(watch(fields[2]), events);

    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item
                validateStatus={createValidStatus(errors, fields[0])}
                help={createMessageValid(errors, fields[0])}
                label="Name"
                name={fields[0]}
            >
                <Controller
                    render={({ field }) => <Input {...field} />}
                    control={control}
                    name={fields[0]}
                />
            </Form.Item>
            <Form.Item
                label="Telegram username"
                name={fields[1]}
                validateStatus={createValidStatus(errors, fields[1])}
                help={createMessageValid(errors, fields[1])}
            >
                <Controller
                    control={control}
                    name={fields[1]}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item label="DatePicker" name={fields[2]}>
                <Controller
                    control={control}
                    name={fields[2]}
                    render={({ field }) => (
                        <DatePicker {...field} style={{ width: '100%' }} />
                    )}
                />
            </Form.Item>
            {filteredEvents.length > 0 ? (
                <Form.Item name={fields[3]} label="Time slots">
                    <Controller
                        name={fields[3]}
                        control={control}
                        render={({ field }) => (
                            <Radio.Group {...field}>
                                {filteredEvents.map((event) => {
                                    const radioValue = moment(
                                        new Date(event.start.dateTime),
                                    ).format('h:mm');
                                    return (
                                        <Radio.Button
                                            key={event.id}
                                            value={radioValue}
                                        >
                                            {radioValue}
                                        </Radio.Button>
                                    );
                                })}
                            </Radio.Group>
                        )}
                    />
                </Form.Item>
            ) : (
                <div style={{ marginBottom: '24px', fontSize: '18px' }}>
                    There are no events on this date
                </div>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
