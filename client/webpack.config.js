const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js',
  },
    
resolve: {
  extensions: ['', '.js', '.jsx', '.css']
  },
  devServer: {
    static: {
    directory:  path.resolve(__dirname, '../public'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api':'http://localhost:7000',
    },
},
 module: {
    rules: [
     {
       test: /\.css$/i,
       use: [MiniCssExtractPlugin.loader, "css-loader"],
     },
     {
       test: /\.js$/i,
       exclude: /node-modules/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['@babel/preset-env'],
         }
       }
       
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/index.html',
      
    }),
    new MiniCssExtractPlugin(),
 ],
};