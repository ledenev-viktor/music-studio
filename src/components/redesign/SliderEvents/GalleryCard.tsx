import styled from '@emotion/styled';
import { Button, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { SlideWithBase64 } from '~types/settings';
import { COLORS } from '~shared/constants';
import { BREAKPOINTS } from '~constants/breakpoints';
import './index.module.css';

const GalleryCardBase = ({
    slide,
    className,
}: {
    slide: SlideWithBase64;
    className?: string;
}) => {
    const { base64, img, title, price } = slide ?? {};
    const { t } = useTranslation();

    return (
        <Flex className={className} style={{ overflow: 'hidden' }}>
            <Content>
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
                    <Action>
                        <ActionButton>Забронировать</ActionButton>
                        <Price>{price} ₾</Price>
                    </Action>
                )}
            </Content>
            <Image src={`${base64 || img}`} alt={title} />
        </Flex>
    );
};

export const GalleryCard = styled(GalleryCardBase)`
    width: 100%;
    height: 100%;
    border-radius: 18px;
    &:hover {
        img {
            transform: scale(1.5);
        }
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    background-color: $black;
    border-radius: 16px;
    transition: all 0.4s;
`;

const Content = styled.div`
    z-index: 1;
    padding: 16px;
    color: ${COLORS.white};
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 10px;
    position: absolute;
    bottom: 20px;
`;

const Action = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    @media screen and (max-width: ${BREAKPOINTS.medium}) {
        justify-content: space-between;
    }
`;

const Price = styled(Typography.Text)`
    font-size: 20px;
    font-weight: 800;
    color: ${COLORS.white};
`;

const ActionButton = styled(Button)`
    border-radius: 24px;
    padding: 5px 10px;
    font-size: 12px;
    box-sizing: border-box;
    background: ${COLORS.blue};
    outline: none;
    border: none;
    color: ${COLORS.white};
`;
