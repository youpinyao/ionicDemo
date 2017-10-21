const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const fs = require('fs');
const path = require('path');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const commonConfig = require('./base.config.js');
const util = require('../util/util');

const assets = ['.dll/vendor.dll.js'];
const dllCssPath = '.dll/vendor.dll.css';
const dllJsPath = '.dll/vendor.dll.js';

module.exports = function() {
  if (!fs.existsSync(path.join(__dirname, '../../www'))) {
    fs.mkdirSync(path.join(__dirname, '../../www'));
  }

  util.copyFile(path.join(__dirname, '../../.dll'), path.join(__dirname, '../../www/.dll'));
  if (fs.existsSync(dllCssPath)) {
    assets.push(dllCssPath);
  }
  if (fs.existsSync(dllJsPath)) {
    assets.push(dllJsPath);
  }
  return webpackMerge(commonConfig(0), {
    cache: true,
    plugins: [
      new HtmlWebpackIncludeAssetsPlugin({
        assets,
        append: false,
        hash: true,
      }),

      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname),
        manifest: require('../../.dll/vendor-manifest.json')
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: false,
        debug: false
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
    ]
  });
};
