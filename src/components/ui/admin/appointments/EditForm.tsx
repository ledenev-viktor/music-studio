import { Button, Form, Input, Space, TimePicker } from 'antd';
import styled from '@emotion/styled';
import { Appointment, EditFormData } from '~types/appointments';
import { getDayJsObject } from '~utils/date.helpers';

export const EditForm = ({
    appointment,
    onCancel,
    onSubmit,
}: {
    appointment: Appointment;
    onCancel: () => void;
    onSubmit: (data: EditFormData) => void;
}) => {
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    return (
        <Form
            form={form}
            {...formItemLayout}
            variant="outlined"
            style={{ paddingTop: '30px' }}
            onFinish={(data) => onSubmit({ ...data, id: appointment.id })}
            initialValues={{
                status: appointment.status,
                fullName: appointment.fullName,
                time: [
                    getDayJsObject(appointment.date, appointment.startTime),
                    getDayJsObject(appointment.date, appointment.endTime),
                ],
                comment: appointment.comment,
                telegram: appointment.telegram,
                instagram: appointment.instagram,
                phone: appointment.phone,
            }}
        >
            {/* <Form.Item label="Status" name="status">
                <Select>
                    {Object.keys(APPOINTMENTS_STATUSES_COLORS).map((status) => (
                        <Select.Option value={status} key={status}>
                            <Badge
                                color={
                                    APPOINTMENTS_STATUSES_COLORS[
                                        status as AppointmentStatuses
                                    ]
                                }
                                text={status}
                            />
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item> */}
            <Form.Item label="Name" name="fullName">
                <Input variant="outlined" />
            </Form.Item>
            <Form.Item label="Time" name="time">
                <TimeRangePicker
                    format="HH"
                    showNow={false}
                    needConfirm={false}
                    changeOnScroll={true}
                    disabledTime={() => ({
                        disabledHours: () =>
                            Array.from({ length: 11 }, (_, index) => index),
                    })}
                />
            </Form.Item>
            <Form.Item label="Comment" name="comment">
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Telegram" name="telegram">
                <Input variant="outlined" />
            </Form.Item>
            <Form.Item label="Instagram" name="instagram">
                <Input variant="outlined" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
                <Input variant="outlined" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 12, span: 6 }}>
                <Space>
                    <Button type="text" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

const TimeRangePicker = styled(TimePicker.RangePicker)`
    li.ant-picker-time-panel-cell-disabled {
        display: none;
    }
`;
