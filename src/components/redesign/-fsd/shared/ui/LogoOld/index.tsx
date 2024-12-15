import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import s from './Logo.module.scss';

type LogoProps = {
    className?: string;
    link?: string;
} & ImageProps;

export const LogoOld = ({ className, link, src, alt, ...props }: LogoProps) => {
    return (
        <div className={cn(s.logo, className)}>
            {link ? (
                <Link href={link}>
                    <Image src={src} alt={alt} {...props} />
                </Link>
            ) : (
                <Image src={src} alt={alt} {...props} />
            )}
        </div>
    );
};
