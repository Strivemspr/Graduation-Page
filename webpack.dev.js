const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader", // 3. Injects Styles into DOM
                    "css-loader", // 2. Turns CSS into CommonJS
                    {
                        // Run postcss actions
                        loader: 'postcss-loader',
                        options: {
                            // `postcssOptions` is needed for postcss 8.x;
                            // if you use postcss 7.x skip the key
                            postcssOptions: {
                            // postcss plugins, can be exported to postcss.config.js
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    },
                    "sass-loader", // 1. Turns Sass to CSS
                ],
            },
        ]
    },
    devServer: {
        // hot: true,
        // hotOnly: true,
        // index: './src/index.html',
        liveReload: true,
        host: '0.0.0.0',
        open: true,
        openPage: 'http://localhost:8080',
        disableHostCheck: true,
        watchContentBase: true,
    },
});