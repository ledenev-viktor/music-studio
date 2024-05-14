import { Card, Flex } from 'antd';
import { Appointment } from '~types/appointments';
import { Footer, Header } from './common';

export const AppointmentNoCommentRow = ({
    appointment,
}: {
    appointment: Appointment;
}) => {
    return (
        <Card
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                padding: '12px 16px',
            }}
            bodyStyle={{ padding: '0' }}
        >
            <Flex
                justify="space-between"
                style={{ marginLeft: '24px' }}
                align="center"
            >
                <Header appointment={appointment} />
                <Footer appointment={appointment} />
            </Flex>
        </Card>
    );
};
