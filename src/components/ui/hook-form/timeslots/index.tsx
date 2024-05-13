import { FC } from 'react';
import { Col, ConfigProvider, Flex, Row, Tag, Typography } from 'antd';
import styled from '@emotion/styled';
import {
    Controller,
    useFormContext,
    UseControllerProps,
} from 'react-hook-form';
import { useMobile } from '~hooks/responsive';
import { COLORS } from 'src/styles/variables';
import { BREAKPOINTS } from '~constants/breakpoints';

type TimeSlotsBaseProps = {
    timeslots: any;
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
    const { Text } = Typography;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const error = errors[name] ? <>{errors[name]?.message}</> : '';
    const isMobile = useMobile();

    return (
        <ConfigProvider
            theme={{
                components: {},
            }}
        >
            <Flex vertical className={className}>
                {label && (
                    <Text
                        style={{
                            marginBottom: ' 10px',
                            fontSize: '18px',
                            fontWeight: '400',
                        }}
                    >
                        {label}
                    </Text>
                )}
                <div className="timeslots-wrapper">
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field: { value, onChange } }) => (
                            <Row justify="space-between" gutter={[20, 20]}>
                                {timeslots.map((slot: any) => (
                                    <Col key={slot.id} span={isMobile ? 12 : 6}>
                                        <Tag.CheckableTag
                                            style={{ width: '100%' }}
                                            checked={value.some(
                                                (v: { value: any }) => {
                                                    return (
                                                        v.value === slot.value
                                                    );
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
                </div>
                {error && (
                    <Text style={{ marginTop: '10px' }} type="danger">
                        {error}
                    </Text>
                )}
            </Flex>
        </ConfigProvider>
    );
};

export const TimeSlots = styled(TimeSlotsBase)`
    margin: 0 0 30px;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
        margin: 0 0 20px;
    }

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
            border-color: ${COLORS.blue2};
            background: none;
            color: #000;
        }

        &.ant-tag-checkable-checked {
            border-color: ${COLORS.blue2};
            color: #000;
            background: none;
        }
        @media screen and (max-width: ${BREAKPOINTS.mobile}) {
            font-size: 14px;
        }
    }
`;
