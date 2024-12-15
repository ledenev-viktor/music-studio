import { FC } from 'react';
import { Col, Flex, Row, Tag, Alert } from 'antd';
import {
    Controller,
    useFormContext,
    UseControllerProps,
} from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { FreeSlots } from '~types/common';
import { convertToAmPm } from '~utils/convertToAmPm';
import { useScreenDetector } from '~hooks/responsive';
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';

type TimeSlotsBaseProps = {
    locale?: string;
    timeSlots: FreeSlots[];
    className?: string;
    label?: string;
} & UseControllerProps;

export const TimeSlots: FC<TimeSlotsBaseProps> = ({
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
        <Flex vertical className={cn(s.wrapper, className)}>
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
