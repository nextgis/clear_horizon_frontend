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

    devtool: isProd ? 'source-map' : 'inline-source-map',

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
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
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
