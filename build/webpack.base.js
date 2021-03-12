'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            pages: resolve('src/pages'),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            // {
            //     test: /\.(png|jpg|svg|gif|webp)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 esModule: false, // 这里设置为false
            //                 limit: 1,
            //                 name: 'imgs/[name].[ext]',
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 10000,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // 自动将静态资源引入html文件中
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
        }),
        new VueLoaderPlugin(),
    ],
}
