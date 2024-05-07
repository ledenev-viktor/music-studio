import styled from '@emotion/styled';
import { baseContainerMixin } from 'src/styles/mixins';

type FooterBaseProps = {
    className?: string;
};

const FooterBase = ({ className }: FooterBaseProps) => {
    return (
        <div className={className}>
            <div className="footer-inner">Footer</div>
        </div>
    );
};

export const Footer = styled(FooterBase)`
    color: #fff;
    background: #333;
    min-height: 200px;
    padding: 30px 0;
    box-sizing: border-box;
    .footer-inner {
        ${baseContainerMixin}
    }
`;
