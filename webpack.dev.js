const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'var',
        library: 'Client',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: 'images/',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.AYLIEN_API_KEY': JSON.stringify(process.env.AYLIEN_API_KEY),
            'process.env.AYLIEN_APP_ID': JSON.stringify(process.env.AYLIEN_APP_ID),
        }),
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 3008,
        allowedHosts: 'all',
        static: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
    },
};
