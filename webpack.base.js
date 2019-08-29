const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: '/node-modules/',
                options: {
                    presets: [
                        '@babel/preset-env',
                        { plugins: ['@babel/plugin-proposal-class-properties'] }
                    ]
                }
            },

            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|mp3|pdf)$/,
                loader: 'url-loader',
                options: {
                    limit: 12000,
                    name: 'res/[hash].[ext]'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

if (isProduction) {
    console.log('Prod build'.red);
}
