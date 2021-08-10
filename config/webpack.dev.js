'use strict';

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // Set the mode to development or production
    mode: 'development',
});
