import { CSSProperties } from 'react';
import { Button } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useScreenDetector } from '~hooks/responsive';

const menu = [
    { text: 'header_menu_home', path: '/' },
    { text: 'header_menu_application', path: '/application' },
    { text: 'header_menu_contacts', path: '/contacts' },
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

    const onMenuItemClick = (path: string, newLocale?: string) => {
        let finalLocale = locale;
        toggle();
        if (newLocale) finalLocale = newLocale;
        push(path, undefined, { locale: finalLocale });
    };

    return (
        <nav className="clientMenu">
            <ul className="clientMenuUl">
                {menu.map((item) => (
                    <LiComponent
                        key={item.text}
                        text={t(item.text)}
                        onClick={() => onMenuItemClick(item.path)}
                        className={cn({
                            active: item.path !== currentPathname,
                        })}
                    />
                ))}
            </ul>
            <ul className="clientMenuUl">
                {languages.map((item) => (
                    <LiComponent
                        key={item.text}
                        text={item.text}
                        onClick={() =>
                            onMenuItemClick(currentPathname, item.locale)
                        }
                        className={cn({
                            active: item.locale !== locale,
                        })}
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
    className,
}: {
    text: string;
    onClick: () => void;
    styles?: CSSProperties;
    className?: string;
}) => {
    const { isTinyDesktop } = useScreenDetector();

    return (
        <li className={cn('clientMenuLi', className)}>
            <Button
                type="link"
                onClick={onClick}
                style={{
                    fontWeight: 'bold',
                    fontSize: isTinyDesktop ? '24px' : '32px',
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
