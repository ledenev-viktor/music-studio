import { ConfigProvider, Segmented, SegmentedProps } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { COLORS } from 'src/styles/variables';

export const LangSwitch = () => {
    const { locales, locale: currentLocale, push } = useRouter();
    const currentPathname = usePathname();

    const onLocaleChange: SegmentedProps['onChange'] = (value) => {
        push(currentPathname, currentPathname, { locale: value as string });
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Segmented: {
                        trackBg: COLORS.blue,
                        itemHoverBg: COLORS.blueHovered,
                        itemColor: COLORS.colorInactive,
                        itemHoverColor: COLORS.colorInactive,
                    },
                },
            }}
        >
            <Segmented
                options={locales as string[]}
                value={currentLocale}
                onChange={onLocaleChange}
            />
        </ConfigProvider>
    );
};
