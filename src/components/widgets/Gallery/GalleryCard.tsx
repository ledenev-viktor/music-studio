import styled from '@emotion/styled';
import { Button, Flex, Typography } from 'antd';
import { SlideWithBase64 } from '~types/settings';
import { COLORS } from '~variables';
import { BREAKPOINTS } from '~constants/breakpoints';
import './index.module.css';

const GalleryCardBase = ({
    slide,
    className,
}: {
    slide: SlideWithBase64;
    className?: string;
}) => {
    const { base64, img, title } = slide;
    const price = '';

    return (
        <Flex className={className}>
            <Content>
                <Typography.Title
                    level={4}
                    style={{
                        margin: 0,
                        color: COLORS.white,
                        textAlign: 'left',
                    }}
                >
                    {title}
                </Typography.Title>
                {price && (
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
    background: blue;
    border-radius: 18px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    pointer-events: none;
    background-color: $black;
    border-radius: 16px;
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
`;

const Action = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    @media screen and (max-width: ${BREAKPOINTS.mobile}) {
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
