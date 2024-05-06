import { Flex, Typography } from 'antd';
import { Appointment } from '~types/appointments';
import { Footer, Header } from './common';

export const getCollapsedContent = ({
    appointment,
}: {
    appointment: Appointment;
}) => {
    return [
        {
            key: appointment.id,
            label: (
                <Flex justify="space-between">
                    <Header appointment={appointment} />
                    <Footer appointment={appointment} />
                </Flex>
            ),
            children: (
                <Flex justify="space-between">
                    <Typography.Paragraph>
                        {appointment.comment}
                    </Typography.Paragraph>
                </Flex>
            ),
        },
    ];
};
