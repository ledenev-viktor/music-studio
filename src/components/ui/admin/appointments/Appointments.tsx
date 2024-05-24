import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { Appointment } from '~types/appointments';
import { getCollapsedContent } from './getCollapsedContent';

export const AppointmentsList = ({ data }: { data: Appointment[] }) => {
    const { t } = useTranslation();
    return (
        <Collapse
            accordion
            ghost
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            items={getCollapsedContent(data, t)}
        />
    );
};
