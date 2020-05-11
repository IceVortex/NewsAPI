const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/main.js',
    mode: "production",
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [ new OptimizeCssAssetsWebpackPlugin(), new TerserPlugin(), new HtmlWebpackPlugin({
            template: "index.html",
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }) ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contentHash].css"}), new CleanWebpackPlugin(), new VueLoaderPlugin()],
    module: {
        rules: [
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "[name].[hash].[ext]",
                    outputPath: "imgs"
                  }
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: [ 'vue-style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader",
                  query: {
                    presets: ["babel-preset-env"],
                    plugins: ["babel-plugin-transform-runtime", "babel-plugin-transform-async-to-generator"]
                  }
                }
            }
        ]
    }
};