var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
        ]
    },
};
