import styled from '@emotion/styled';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

type LogoProps = {
    className?: string;
    link?: string;
} & ImageProps;

const LogoBase = ({ className, link, src, alt, ...props }: LogoProps) => {
    return (
        <div className={className}>
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

export const Logo = styled(LogoBase)`
    line-height: 0;
`;
