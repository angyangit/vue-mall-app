// webpack.base.js
// 存放通用配置
const webpack = require('webpack')
const path = require('path')
// 用于解析vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// html文件插件，将静态文件引入html中
const HTMLWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/app.js', // 项目的入口文件
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false, // 这里设置为false
              limit: 1,
              name: 'imgs/[name].[ext]',
            },
          },
        ],
      },
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
    new VueLoaderPlugin(),
    // 自动将静态资源引入html文件中
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ],
}
