/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { i18n } = require('./next-i18next.config');

module.exports = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/')],
        prependData: `
        @import "app/styles/colors.scss";
        @import "app/styles/breakpoints.scss";
        `,
    },
    compiler: {
        styledComponents: true,
    },
    i18n,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.google.com',
                pathname: '**',
            },
        ],
    },
    // https://github.com/ant-design/pro-components/issues/4852#issuecomment-1364570216
    // fixing the issue with import for antd design and other libraries
    transpilePackages: [
        'antd',
        '@ant-design/plots',
        '@ant-design/icons',
        '@ant-design/icons-svg',
        '@ant-design/pro-components',
        '@ant-design/pro-layout',
        '@ant-design/pro-list',
        '@ant-design/pro-descriptions',
        '@ant-design/pro-form',
        '@ant-design/pro-skeleton',
        '@ant-design/pro-field',
        '@ant-design/pro-utils',
        '@ant-design/pro-provider',
        '@ant-design/pro-card',
        '@ant-design/pro-table',
        'rc-pagination',
        'rc-picker',
        'rc-util',
        'rc-tree',
        'rc-input',
        'rc-tooltip',
        'next-auth',
    ],
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        );
        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }

        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: true,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: { removeViewBox: false },
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        });

        return config;
    },
};
