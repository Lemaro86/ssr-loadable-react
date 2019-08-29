const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');


const config = {
    target: 'web',
    entry: ['./src/client/client.jsx'],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        chunkFilename: '[name].chunk.js',
        // read about next string in webpack.server.js
        publicPath: '/public/'
    },

    module: {
        rules: [
            {
                test: /\.scss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // this only for modules styles, if have other kill it
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            },
                            importLoaders: 2,
                        }

                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            //this need for prefetchFunction
            __SERVER__: JSON.stringify(false),
            __CLIENT__: JSON.stringify(true)
        }),
        // Please, be careful here. This is a very important string.
        // All your chunks will be created such as your write here for chunkFileName
        // If you change here, you cant getBundles in renderer
        new MiniCssExtractPlugin({ filename: '[name].css', allChunks: true, chunkFilename: '[name].chunk.css' }),
        // Yes, there is so much method to get assets-manifest, however I understood only next lib
        new ReactLoadableSSRAddon({
            filename: path.resolve(__dirname, 'build', 'assets-manifest.json')
        })
    ],
    optimization: {
        // O my god, I spent apporximate two days to found why my chunks in loadable has id instead name
        chunkIds: 'named',
        splitChunks: {
            minChunks: Infinity,
            name: 'manifest'
        }
    }
};

module.exports = merge(baseConfig, config);
