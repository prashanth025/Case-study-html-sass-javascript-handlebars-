const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                }
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader,options:{publicPath:""}}, 'css-loader', 'sass-loader',
                ],
            },
            {
                test: /\.hbs$/,
                use: [{
                  loader: "handlebars-loader",
                  options: {helperDirs: path.resolve(__dirname, "./src/helpers")}
                }]
              }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/login.html",
            filename: "./login.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/login.html",
            filename: "./login.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/products.html",
            filename: "./products.html"
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "static", to:'static' },
            ],
          }),
    ]
}