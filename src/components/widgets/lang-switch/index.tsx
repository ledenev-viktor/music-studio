import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { COLORS } from 'src/styles/variables';

const LangSwitchBase = ({ className }: { className?: string }) => {
    const { locales, asPath } = useRouter();

    return (
        <div className={className}>
            {locales?.map((locale) => (
                <Link
                    className="link"
                    key={locale}
                    href={asPath}
                    locale={locale}
                >
                    {locale}
                </Link>
            ))}
        </div>
    );
};

export const LangSwitch = styled(LangSwitchBase)`
    .link {
        padding: 4px 8px;
        background: ${COLORS.white};
        height: auto;
        box-sizing: border-box;
        border-radius: 5px;
        color: ${COLORS.blue};
        margin-right: 5px;
        font-weight: 500;

        &:hover {
            color: ${COLORS.pink};
        }
    }
`;
