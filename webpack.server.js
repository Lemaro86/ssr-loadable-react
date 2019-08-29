const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const nodeExternals = require('webpack-node-externals');

const config = {
    target: 'node',
    // polyfill resolve much problem with gydrate and with two build server - client
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        chunkFilename: '[name].chunk.js',
        // If you remove it, all your routes of second level will be crushed
        // because, in lodable chunks path will be absolute, but not relative
        // so string and in client
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            },
                            importLoaders: 2,
                            onlyLocals: true
                        }

                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            __SERVER__: JSON.stringify(true),
            __CLIENT__: JSON.stringify(false)
        })
    ]
};

module.exports = merge(baseConfig, config);
