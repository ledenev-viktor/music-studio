import { Button, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import cn from 'classnames';
import { SlideFields } from '~types/slides';
import { COLORS } from '~shared/constants';
import s from './SliderEvents.module.scss';

export const GalleryCard = ({
    slide,
    className,
}: {
    slide: SlideFields;
    className?: string;
}) => {
    const { base64, img, title, price } = slide ?? {};
    const { t } = useTranslation();

    return (
        <Flex
            className={cn(s.wrapperCard, className)}
            style={{ overflow: 'hidden' }}
        >
            <div className={s.content}>
                <Typography.Title
                    level={4}
                    style={{
                        margin: 0,
                        color: COLORS.white,
                        textAlign: 'left',
                    }}
                >
                    {t(`slider:${title}`)}
                </Typography.Title>
                {!!price && (
                    <div className={s.action}>
                        <Button className={s.actionButton}>
                            Забронировать
                        </Button>
                        <div className={s.price}>{price} ₾</div>
                    </div>
                )}
            </div>
            <Image
                className={s.img}
                src={`${base64 || img}`}
                width={500}
                height={500}
                layout="responsive"
                alt={title}
            />
        </Flex>
    );
};
