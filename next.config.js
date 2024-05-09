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
        includePaths: [path.join(__dirname, 'styles')],
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
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
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
        'rc-tooltip',
        'next-auth',
    ],
};
