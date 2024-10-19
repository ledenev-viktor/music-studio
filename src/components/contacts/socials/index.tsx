import { LaptopLinks } from './LaptopLinks';
import { MobileLinks } from './MobileLinks';

export const Socials = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (isMobile) return <MobileLinks />;

    return <LaptopLinks />;
};
