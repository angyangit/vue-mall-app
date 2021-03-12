// webpack.dev.js
// development环境
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.base');
const path = require('path');
const env = require('../config/dev.env')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // 入口页面所在文件夹
        contentBase: '../public',
        // 将所有请求都打回index.html，因为此处配置是单页面应用
        historyApiFallback: true,
        // 本地mock数据配置，mock数据配置在mocker.js中
        // before: function (app) {
        //     apiMocker(app, path.resolve('public/mocker.js'));
        // },
        // 监听端口
        port: 8889,
        // 启动后自动打开网址
        open: 'http://localhost:8889/',
        // 让同网域其他设备访问本地服务
        host: '172.20.10.2'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,//不配置导致图片不显示
                            limit: 10240,
                            name: 'imgs/[name].[contenthash:5].[ext]'
                        }
                    },
                    // {
                    //     // 对图片进行压缩处理，配置项参考官方文档
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         mozjpeg: {
                    //             progressive: true,
                    //             quality: 65
                    //         },
                    //         optipng: {
                    //             enabled: false
                    //         },
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         },
                    //         gifsicle: {
                    //             interlaced: false
                    //         },
                    //         webp: {
                    //             quality: 75
                    //         }
                    //     }
                    // }
                ]
            }
        ]
    },
    output: {
        filename: 'js/[name].[hash:5].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        })
    ]
})
;
