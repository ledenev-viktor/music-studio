import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

type FieldWrapperProps = {
    label?: string;
    children: ReactNode;
    className?: string;
};

export const _FieldWrapper: FC<FieldWrapperProps> = ({
    label,
    className,
    children,
}) => {
    return (
        <div className={className}>
            {label && <div className="field-label">{label}</div>}
            <div className="field-children">{children}</div>
        </div>
    );
};

export const FieldWrapper = styled(_FieldWrapper)`
    margin: 0 0 40px;

    @media screen and (max-width: 767px) {
        margin: 0 0 20px;
    }

    .field {
        &-label {
            margin-bottom: 10px;
            font-size: 18px;
            font-weight: 500;
        }
    }
`;
