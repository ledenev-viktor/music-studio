/* eslint-disable react/prop-types */
import React from 'react';
import { Dayjs } from 'dayjs';
import { Button, Col, Row, Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { COLORS } from '~variables';

export const CalendarHeader = ({
    current,
    today,
    setCurrent,
    startMonth,
    endMonth,
    onWeekChange,
}: {
    current: Dayjs;
    today: Dayjs;
    setCurrent: (val: Dayjs) => void;
    startMonth: string;
    endMonth: string;
    onWeekChange: (start: Dayjs, end: Dayjs) => void;
}) => (
    <Row wrap={false} style={{ width: '100%' }} justify="space-between">
        <Col xs={3}>
            {today.isBefore(current) && (
                <Button
                    type="text"
                    onClick={() => {
                        setCurrent(current.subtract(1, 'week'));
                        onWeekChange(current.subtract(1, 'week'), current);
                    }}
                >
                    <LeftOutlined style={{ color: COLORS.black }} />
                </Button>
            )}
        </Col>
        <Col xs={18} style={{ textAlign: 'center' }}>
            <Typography.Title level={3} style={{ margin: 0 }}>
                {endMonth !== startMonth
                    ? `${startMonth} - ${endMonth}`
                    : startMonth}
            </Typography.Title>
        </Col>
        <Col xs={3} flex={1}>
            <Button
                type="text"
                onClick={() => {
                    setCurrent(current.add(1, 'week'));
                    onWeekChange(
                        current.add(1, 'week'),
                        current.add(2, 'week'),
                    );
                }}
                style={{ marginLeft: 13 }}
            >
                <RightOutlined style={{ color: COLORS.black }} />
            </Button>
        </Col>
    </Row>
);
