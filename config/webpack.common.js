'use strict';

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const plugins = [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../index.html'), // template file
        filename: 'index.html', // output file
    }),
    new WebpackBar(),
    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
];

if (process.env.WEBPACK_ANALYZE_SIZE) {
    plugins.push(
        new BundleAnalyzerPlugin({
            logLevel: 'silent',
            openAnalyzer: false,
        })
    );
}

module.exports = {
    // Where webpack looks to start building the bundle
    entry: [path.resolve(__dirname, '../js/index.js')],
    stats: 'errors-only',
    // Where webpack outputs the assets and bundles
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    // Customize the webpack build process
    plugins,
    // Determine how modules within the project are treated
    module: {
        rules: [
            { test: /\.(ico|gif|png|jpg|jpeg|woff(2)?|eot|ttf|otf|svg|)$/i, type: 'asset/resource' },
        ],
    },
    experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true,
    }
};
