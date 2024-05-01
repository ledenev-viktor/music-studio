/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config, options) => {
        config.plugins.push(new StylelintPlugin());
        return config;
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
            {
                source: '/api/dummy',
                destination: 'https://dummyjson.com/products/1',
                permanent: true,
            },
        ];
    },
};
