const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const workbox_ServiceWorkers= require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
        
    },
    output: {
        libraryTarget: 'var',
        library: "Client",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath: '/src/client/media',
                        publicPath: '/src/client/media'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new LinkTypePlugin({
            '**/*.css': 'text/css'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
          new webpack.DefinePlugin({
            "process.env": {
            
              NODE_ENV: JSON.stringify("production")}
            }),
        new workbox_ServiceWorkers.GenerateSW(),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        

    ]
}
