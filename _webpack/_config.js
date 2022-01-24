const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const resolvePath = (...relative) => path.resolve(process.cwd(), ...relative); 

module.exports = {
    entry: resolvePath('src/index.js'),
    output: {
        path: resolvePath('dist'),
        filename: 'static/[name].[fullhash:8].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                use: 'babel-loader',
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader',
                options: {
                  name: 'static/icons/[name].[ext]'
                }
            }
        ],
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'styles.[fullhash:4].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolvePath('assets/index.html'),
            templateParameters: {
                title: 'Weather Forecast',
                rootID: 'app',
            },
        }),
    ]
};
