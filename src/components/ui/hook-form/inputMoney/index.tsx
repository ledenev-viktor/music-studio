import { FC } from 'react';
import styled from '@emotion/styled';
import { InputNumber, InputNumberProps } from 'antd';

type InputBaseProps = {
    className?: string;
    label?: string;
} & InputNumberProps;

export const InputMoneyBase: FC<InputBaseProps> = ({
    name,
    id,
    className,
    ...props
}) => {
    return (
        <InputNumber
            {...props}
            className={className}
            id={id || name}
            onWheel={(e) => {
                const target = e.target as HTMLInputElement;
                target.blur();
            }}
            onKeyDown={(event) => {
                const re = /^[0-9\b.]+$/;

                const { value, selectionStart } =
                    event.target as HTMLInputElement;
                const sum = value?.replace(/\s+/g, '');
                const reSumWithCent = /^\d+\.\d{2}$/;

                const allowedKeys = [
                    'Backspace',
                    'ArrowRight',
                    'ArrowLeft',
                    'Tab',
                ];
                const allowedMetaKeys = ['v', 'c'];

                if (
                    !!sum &&
                    reSumWithCent.test(sum) &&
                    !allowedKeys.includes(event.key) &&
                    selectionStart &&
                    selectionStart >= value.length - 2
                ) {
                    event.preventDefault();
                }

                const isMetaKeyWithAllowedKey =
                    event.metaKey && allowedMetaKeys.includes(event.key);
                if (
                    !re.test(event.key) &&
                    !allowedKeys.includes(event.key) &&
                    !isMetaKeyWithAllowedKey
                ) {
                    event.preventDefault();
                }
            }}
            formatter={(value) =>
                value
                    ? `${value
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`
                    : ''
            }
            controls={false}
        />
    );
};

export const InputMoney = styled(InputMoneyBase)`
    width: 100%;
`;
