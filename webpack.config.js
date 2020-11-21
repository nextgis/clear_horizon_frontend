const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

let alias = {};
try {
  const { getAliases } = require('./@nextgis/scripts/aliases');
  alias = getAliases();
} catch (er) {
  // ignore
}

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  const config = {
    mode: 'development',

    devtool: isProd ? 'none' : 'inline-source-map',

    entry: {
      main: ['./src/main.ts'],
    },

    output: {
      filename: '[name][hash:7].js',
    },

    resolve: {
      extensions: ['.js', '.ts', '.json'],
      alias,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                // transpileOnly: !isProd,
              },
            },
          ],
        },
 {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]-[hash:7].[ext]',
          ],
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name]-[hash:7].[ext]',
          ],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: ['file-loader?name=fonts/[name]-[hash:7].[ext]'],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader?bypassOnDebug',
          ],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name][hash:7].css',
      }),
      new ESLintPlugin({
        fix: true,
        files: ['src/'],
        extensions: ['ts'],
      }),
      new HtmlWebpackPlugin({ template: 'src/index.html' }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
        __BROWSER__: true,
        __DEV__: !isProd,
      }),
      // new FaviconsWebpackPlugin('./src/img/favicon.png')
    ],

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000,
      },
    },
  };

  return config;
};
