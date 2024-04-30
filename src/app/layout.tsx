import { Metadata } from 'next';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
});

export const metadata: Metadata = {
    title: 'Praktika',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={roboto.className}>
            <body>{children}</body>
        </html>
    );
}
