var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/tree.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        globalObject: "this",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
      },    
    stats: {
        colors: true
    },
    devtool: 'source-map',
};