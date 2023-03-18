const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
   
    
    module: {
        rules: [
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
            },
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader"
            },{
                test: /\.scss$/,
                
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
        output: {
            libraryTarget: 'var',
            library: 'Client',
            path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/schedule.html",
            filename: "./schedule.html",
        }),



        new CleanWebpackPlugin({
        
            dry: true,
           
            verbose: true,
           
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
          new webpack.DefinePlugin({
            "process.env": {
           
              NODE_ENV: JSON.stringify("development")}
            })
    
            ]
}
