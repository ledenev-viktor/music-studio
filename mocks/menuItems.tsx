import { ReactNode } from 'react';
import Link from 'next/link';

type PointMenu = {
    label: ReactNode;
    key: number;
};
type MenuItems = {
    en: PointMenu[];
    ka: PointMenu[];
    ru: PointMenu[];
};

export const menuItems: MenuItems = {
    en: [
        {
            label: (
                <Link href="/home" passHref>
                    Home
                </Link>
            ),
            key: 1,
        },
        {
            label: (
                <Link href="/application" passHref>
                    Application
                </Link>
            ),
            key: 2,
        },
        {
            label: (
                <Link href="/contacts" passHref>
                    Contacts
                </Link>
            ),
            key: 3,
        },
    ],
    ka: [
        {
            label: (
                <Link href="/home" passHref>
                    მთავარი
                </Link>
            ),
            key: 1,
        },
        {
            label: (
                <Link href="/application" passHref>
                    დარეგისტრირდით
                </Link>
            ),
            key: 2,
        },
        {
            label: (
                <Link href="/contacts" passHref>
                    კონტაქტები
                </Link>
            ),
            key: 3,
        },
    ],
    ru: [
        {
            label: (
                <Link href="/home" passHref>
                    Главная
                </Link>
            ),
            key: 1,
        },
        {
            label: (
                <Link href="/application" passHref>
                    Записаться
                </Link>
            ),
            key: 2,
        },
        {
            label: (
                <Link href="/contacts" passHref>
                    Контакты
                </Link>
            ),
            key: 3,
        },
    ],
};
