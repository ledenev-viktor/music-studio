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
import { ErrorMessage } from '../ErrorMessage';
import { Label } from '../Label';
import { FreeSlots } from '~shared/types/common';
import { convertToAmPm } from '~shared/utils/convertToAmPm';
import { useScreenDetector } from '~shared/hooks/responsive';
import s from './TimeSlots.module.scss';

type TimeSlotsBaseProps = {
    locale?: string;
    timeSlots: FreeSlots[];
    className?: string;
    label?: string;
} & UseControllerProps;

export const TimeSlots = ({
    name,
    label,
    rules,
    timeSlots = [],
    className,
}: TimeSlotsBaseProps) => {
    const { t } = useTranslation();
    const { locale } = useRouter();
    const { isSmallMobile, isMobile } = useScreenDetector();
    const {
        control,
        formState: { errors },
        trigger,
    } = useFormContext();

    const error =
        errors[name] && typeof errors[name]?.message === 'string'
            ? errors[name]?.message
            : '';

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
                                        className={s.timeSlot}
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
                {error && (
                    <ErrorMessage motionId={name}>
                        <>{error}</>
                    </ErrorMessage>
                )}
            </AnimatePresence>
        </Flex>
    );
};
