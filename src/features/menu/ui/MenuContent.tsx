import { CSSProperties } from 'react';
import { Button } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import s from './CustomMenu.module.scss';

const menu = [
    { text: 'common:menuHomeButton', path: '/' },
    { text: 'common:menuApplicationButton', path: '/application' },
    { text: 'common:menuContactsButton', path: '/contacts' },
];

const languages = [
    { text: 'Русский', locale: 'ru' },
    { text: 'English', locale: 'en' },
    { text: 'ქართული', locale: 'ka' },
];

export const MenuContent = ({ toggle }: { toggle: () => void }) => {
    const { t } = useTranslation();
    const { locale, push } = useRouter();
    const currentPathname = usePathname();

    const onMenuItemClick = (path: string | null, newLocale?: string) => {
        if (!path) return;

        let finalLocale = locale;
        toggle();
        if (newLocale) finalLocale = newLocale;
        push(path, undefined, { locale: finalLocale });
    };

    return (
        <nav className={s.clientMenu} style={{ paddingTop: '30px' }}>
            <ul className={s.clientMenuUl}>
                {menu.map((item) => (
                    <LiComponent
                        key={item.text}
                        text={t(item.text)}
                        onClick={() => onMenuItemClick(item.path)}
                        styles={
                            item.path !== currentPathname
                                ? { opacity: 0.5 }
                                : undefined
                        }
                    />
                ))}
            </ul>
            <ul
                className={s.clientMenuUl}
                style={{
                    paddingTop: '30px',
                }}
            >
                {languages.map((item) => (
                    <LiComponent
                        key={item.text}
                        text={item.text}
                        onClick={() =>
                            onMenuItemClick(currentPathname, item.locale)
                        }
                        styles={
                            item.locale !== locale
                                ? { opacity: 0.5 }
                                : undefined
                        }
                    />
                ))}
            </ul>
        </nav>
    );
};

const LiComponent = ({
    text,
    onClick,
    styles,
}: {
    text: string;
    onClick: () => void;
    styles?: CSSProperties;
}) => {
    return (
        <li className={s.clientMenuLi}>
            <Button
                type="link"
                onClick={onClick}
                style={{
                    fontWeight: 'bold',
                    fontSize: '32px',
                    padding: '0',
                    color: 'white',
                    width: '100%',
                    height: 'auto',
                    ...styles,
                }}
            >
                {text}
            </Button>
        </li>
    );
};
