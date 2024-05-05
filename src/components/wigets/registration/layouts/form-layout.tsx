import { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

type FormLayoutProps = {
    children: ReactNode;
    title?: string;
    className?: string;
};

export const _FormLayout: FC<FormLayoutProps> = ({
    title,
    children,
    className,
}) => {
    return (
        <div className={className}>
            <div className="form-wrapper">
                {title && <div className="form-head">{title}</div>}
                <div className="form-body">{children}</div>
            </div>
        </div>
    );
};

export const FormLayout = styled(_FormLayout)`
    .form {
        &-wrapper {
            max-width: 900px;
            margin: 0 auto;
            padding: 30px 60px 60px;
            box-sizing: border-box;
            box-shadow: 0px 0px 20px -14px rgba(0, 0, 0, 1);
            border-radius: 15px;
            @media screen and (max-width: 767px) {
                padding: 20px;
            }
        }

        &-head {
            margin-bottom: 40px;
            font-size: 48px;
            font-weight: 600;
            @media screen and (max-width: 767px) {
                font-size: 24px;
                margin-bottom: 20px;
            }
        }
    }
`;
