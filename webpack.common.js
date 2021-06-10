const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/controller.js',
        vendor: './src/js/vendor/vendor.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    output: {
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: {
                        list: [
                            {
                                tag: 'source',
                                attribute: 'src',
                                type: 'src',
                            },
                            {
                                tag: 'a',
                                attribute: 'href',
                                type: 'src',
                            },
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src',
                            },
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // /\.png/, // /\.(png|jpe?g|svg|)$/ // Change Assets Extension
                type: 'asset/resource',
            },
        ],
    },
};
