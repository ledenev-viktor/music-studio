import { FC } from 'react';
import { Flex, Tag, Typography } from 'antd';
import styled from '@emotion/styled';
import {
    Controller,
    useFormContext,
    UseControllerProps,
} from 'react-hook-form';
import { TimeSlot } from '~components/wigets/registration/types/form';

type TimeSlotsBaseProps = {
    timeslots: TimeSlot[];
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

    return (
        <Flex vertical className={className}>
            {label && <Text className="label">{label}</Text>}
            <div className="timeslots-wrapper">
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field: { value, onChange } }) => (
                        <>
                            {timeslots.map((slot: TimeSlot) => (
                                <Tag.CheckableTag
                                    key={slot.id}
                                    checked={value.some(
                                        (v: TimeSlot) => v.value === slot.value,
                                    )}
                                    onChange={(checked) => {
                                        const nextValue = checked
                                            ? [...value, slot]
                                            : value.filter(
                                                  (v: TimeSlot) =>
                                                      v.value !== slot.value,
                                              );
                                        onChange(nextValue);
                                    }}
                                >
                                    {slot.label}
                                </Tag.CheckableTag>
                            ))}
                        </>
                    )}
                />
            </div>
            {error && <Text type="danger">{error}</Text>}
        </Flex>
    );
};

export const TimeSlots = styled(TimeSlotsBase)`
    margin: 0 0 40px;

    @media screen and (max-width: 767px) {
        margin: 0 0 20px;
    }

    .label {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 400;
    }
    .timeslots-wrapper {
        display: flex;
        max-width: 350px;
        margin: -5px -10px;
        flex-wrap: wrap;
        @media screen and (max-width: 767px) {
            margin: -5px;
        }
    }
    .ant-tag {
        width: calc(100% / 2 - 20px);
        margin: 5px 10px;
        text-align: center;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        padding: 10px 8px;
        box-sizing: border-box;
        line-height: 1;
        font-size: 16px;
        color: #000;

        &:hover {
            border-color: #4096ff;
            background: none;
            color: #000;
        }

        &.ant-tag-checkable-checked {
            border-color: #4096ff;
            color: #000;
            background: none;
        }
        @media screen and (max-width: 767px) {
            width: calc(100% / 2 - 10px);
            margin: 5px;
            font-size: 14px;
        }
    }
`;
