import { Collapse } from 'antd';
import { Appointment } from '~types/appointments';
import { APPOINTMENTS_STATUSES } from '~constants/status';
import { getCollapsedContent } from './collapse';
import { AppointmentNoCommentRow } from './NoCommentRow';

export const AppointmentRow = ({
    appointment,
}: {
    appointment: Appointment;
}) => {
    const content = getCollapsedContent({
        appointment,
    });

    return appointment.comment ? (
        <Collapse
            key={appointment.id}
            items={content}
            accordion
            collapsible={
                appointment.status === APPOINTMENTS_STATUSES.REJECTED
                    ? 'disabled'
                    : 'icon'
            }
        />
    ) : (
        <AppointmentNoCommentRow
            key={appointment.id}
            appointment={appointment}
        />
    );
};
