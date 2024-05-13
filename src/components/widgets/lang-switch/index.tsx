import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { COLORS } from 'src/styles/variables';

const LangSwitchBase = ({ className }: { className?: string }) => {
    const { locale, locales, asPath } = useRouter();
    const actualLocales = locales?.filter((current) => current !== locale);
    return (
        <div className={className}>
            {actualLocales?.map((locale) => (
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
