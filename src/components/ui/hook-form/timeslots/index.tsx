import { FC } from 'react';
import { Col, Flex, Row, Tag, Alert } from 'antd';
import styled from '@emotion/styled';
import {
    Controller,
    useFormContext,
    UseControllerProps,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { COLORS } from 'src/styles/variables';
import { FreeSlots } from '~types/common';
import { ErrorMessage, Label } from '../common';
import { BREAKPOINTS } from '~constants/breakpoints';

type TimeSlotsBaseProps = {
    timeslots: FreeSlots[];
    className?: string;
    label?: string;
} & UseControllerProps;

const TimeSlotsBase: FC<TimeSlotsBaseProps> = ({
    name,
    label,
    rules,
    timeslots = [],
    className,
}) => {
    const { t } = useTranslation();
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name] ? <>{errors[name]?.message}</> : '';

    if (!timeslots.length) {
        return <Alert type="error" message={t('slots_empty')} />;
    }

    const getSpan = () => {
        if (timeslots.length < 6) return 12;

        return 8;
    };

    return (
        <Flex vertical className={className}>
            <AnimatePresence mode="wait" initial={false}>
                {label && <Label>{label}</Label>}
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { value, onChange } }) => (
                        <Row justify="space-between" gutter={[20, 20]} wrap>
                            {timeslots.map((slot: any) => (
                                <Col key={slot.id} span={getSpan()}>
                                    <Tag.CheckableTag
                                        style={{ width: '100%' }}
                                        checked={value.some(
                                            (v: { value: any }) => {
                                                return v.value === slot.value;
                                            },
                                        )}
                                        onChange={(checked) => {
                                            const nextValue = checked
                                                ? [...value, slot]
                                                : value.filter(
                                                      (v: { value: any }) =>
                                                          v.value !==
                                                          slot.value,
                                                  );
                                            onChange(nextValue);
                                        }}
                                    >
                                        {slot.label}
                                    </Tag.CheckableTag>
                                </Col>
                            ))}
                        </Row>
                    )}
                />
                {error && <ErrorMessage motionId={name}>{error}</ErrorMessage>}
            </AnimatePresence>
        </Flex>
    );
};

export const TimeSlots = styled(TimeSlotsBase)`
    .ant-tag {
        width: 100%;
        text-align: center;
        border: 1px solid ${COLORS.grey};
        border-radius: 10px;
        padding: 10px 8px;
        box-sizing: border-box;
        line-height: 1;
        font-size: 16px;
        color: #000;

        &:hover {
            background-color: ${COLORS.white};
            border: 1px solid ${COLORS.blue};
            color: #000;
        }

        &.ant-tag-checkable-checked {
            background-color: ${COLORS.white};
            border: 1px solid ${COLORS.blue};
            color: #000;
        }

        @media screen and (max-width: ${BREAKPOINTS.mobile}) {
            font-size: 14px;
        }
    }
`;
