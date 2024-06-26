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
import { useRouter } from 'next/router';
import { useScreenDetector } from '~hooks/responsive';
import { COLORS } from 'src/styles/variables';
import { FreeSlots } from '~types/common';
import { convertToAmPm } from '~utils/convertToAmPm';
import { ErrorMessage, Label } from '../common';
import { BREAKPOINTS } from '~constants/breakpoints';

type TimeSlotsBaseProps = {
    locale?: string;
    timeSlots: FreeSlots[];
    className?: string;
    label?: string;
} & UseControllerProps;

const TimeSlotsBase: FC<TimeSlotsBaseProps> = ({
    name,
    label,
    rules,
    timeSlots = [],
    className,
}) => {
    const { t } = useTranslation();
    const { locale } = useRouter();
    const { isSmallMobile, isMobile } = useScreenDetector();
    const {
        control,
        formState: { errors },
        trigger,
    } = useFormContext();

    const error = errors[name] ? <>{errors[name]?.message}</> : '';

    if (!timeSlots.length) {
        return <Alert type="error" message={t('slots_empty')} />;
    }

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
                            {timeSlots.map((slot: FreeSlots) => (
                                <Col
                                    key={slot.id}
                                    span={!isSmallMobile && !isMobile ? 8 : 12}
                                >
                                    <Tag.CheckableTag
                                        style={{ width: '100%' }}
                                        checked={value.some(
                                            ({ value }: { value: string }) => {
                                                return value === slot.value;
                                            },
                                        )}
                                        onChange={(checked) => {
                                            trigger('selectedTimeSlots');
                                            const nextValue = checked
                                                ? [...value, slot]
                                                : value.filter(
                                                      ({
                                                          value,
                                                      }: {
                                                          value: string;
                                                      }) =>
                                                          value !== slot.value,
                                                  );
                                            onChange(nextValue);
                                        }}
                                    >
                                        {locale === 'en'
                                            ? convertToAmPm(slot.label)
                                            : slot.label}
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
        border: 1px solid ${COLORS.lightgrey};
        border-radius: 10px;
        padding: 10px 8px;
        box-sizing: border-box;
        line-height: 1;
        font-size: 14px;
        color: ${COLORS.black};
        background: ${COLORS.lightgrey};
        transition: all 0.3s ease;

        &:hover {
            border-color: ${COLORS.lightgrey};
            border: 1px solid ${COLORS.blue};
            color: #000;
            background: ${COLORS.white};
        }

        &.ant-tag-checkable-checked {
            border-color: ${COLORS.blue};
            color: ${COLORS.blue};
            background: none;
        }
        @media screen and (max-width: ${BREAKPOINTS.smallMobile}) {
            font-size: 12px;
        }
    }
`;
