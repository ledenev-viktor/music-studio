import { FC } from 'react';
import { Col, ConfigProvider, Flex, Row, Tag, Typography } from 'antd';
import styled from '@emotion/styled';
import {
    Controller,
    useFormContext,
    UseControllerProps,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { useScreenDetector } from '~hooks/responsive';
import { COLORS } from 'src/styles/variables';
import { FreeSlots } from '~types/common';
import { convertToAmPm } from '~utils/convertToAmPm';
import { ErrorMessage, Label } from '../common';
import { BREAKPOINTS } from '~constants/breakpoints';

type TimeSlotsBaseProps = {
    locale?: string;
    timeslots: FreeSlots[];
    className?: string;
    label?: string;
    emptySlotsMessage: string;
} & UseControllerProps;

const TimeSlotsBase: FC<TimeSlotsBaseProps> = ({
    locale = 'en',
    name,
    label,
    rules,
    timeslots = [],
    emptySlotsMessage,
    className,
}) => {
    const { isSmallMobile, isMobile } = useScreenDetector();
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name] ? <>{errors[name]?.message}</> : '';

    return (
        <ConfigProvider
            theme={{
                components: {},
            }}
        >
            <Flex vertical className={className}>
                <AnimatePresence mode="wait" initial={false}>
                    {label && <Label>{label}</Label>}
                    <div className="timeslots-wrapper">
                        <Controller
                            name={name}
                            control={control}
                            rules={rules}
                            render={({ field: { value, onChange } }) =>
                                timeslots.length > 0 ? (
                                    <Row
                                        justify="space-between"
                                        gutter={[20, 20]}
                                        wrap
                                    >
                                        {timeslots.map((slot: any) => (
                                            <Col
                                                key={slot.id}
                                                span={
                                                    !isSmallMobile && !isMobile
                                                        ? 8
                                                        : 12
                                                }
                                            >
                                                <Tag.CheckableTag
                                                    style={{ width: '100%' }}
                                                    checked={value.some(
                                                        (v: { value: any }) => {
                                                            return (
                                                                v.value ===
                                                                slot.value
                                                            );
                                                        },
                                                    )}
                                                    onChange={(checked) => {
                                                        const nextValue =
                                                            checked
                                                                ? [
                                                                      ...value,
                                                                      slot,
                                                                  ]
                                                                : value.filter(
                                                                      (v: {
                                                                          value: any;
                                                                      }) =>
                                                                          v.value !==
                                                                          slot.value,
                                                                  );
                                                        onChange(nextValue);
                                                    }}
                                                >
                                                    {locale === 'en'
                                                        ? convertToAmPm(
                                                              slot.label,
                                                          )
                                                        : slot.label}
                                                </Tag.CheckableTag>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <Typography.Text>
                                        {emptySlotsMessage}
                                    </Typography.Text>
                                )
                            }
                        />
                    </div>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </AnimatePresence>
            </Flex>
        </ConfigProvider>
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
        font-size: 14px;
        color: #000;

        &:hover {
            border-color: ${COLORS.blue2};
            background: none;
            color: #000;
        }

        &.ant-tag-checkable-checked {
            border-color: ${COLORS.blue2};
            color: #000;
            background: none;
        }
        @media screen and (max-width: ${BREAKPOINTS.smallMobile}) {
            font-size: 12px;
        }
    }
`;
