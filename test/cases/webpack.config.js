const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        bundle: './linechart-v2.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'demo',
            chunks: ['bundle'],
        }),
    ],
};
