const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const supportedLocales = ['ru', 'en'];
const alias = {};
try {
  const { getAliases } = require('./@nextgis/scripts/aliases');
  Object.assign(alias, getAliases());
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
      publicPath: '',
      filename: '[name][hash:7].js',
    },

    resolve: {
      extensions: ['.js', '.ts', '.json'],
      alias,
    },

    module: {
      rules: [
        {
          // test: /\.jsx?$/,
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        // {
        //   test: /\.tsx?$/,
        //   exclude: /node_modules/,
        //   use: [
        //     {
        //       loader: 'ts-loader',
        //       options: {
        //         // disable type checker - we will use it in fork plugin
        //         // transpileOnly: !isProd,
        //         transpileOnly: false,
        //       },
        //     },
        //   ],
        // },
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
          test: /\.(html)$/,
          use: ['html-loader'],
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

    target: isProd ? 'browserslist' : 'web',

    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new ESLintPlugin({
        fix: true,
        files: ['src/'],
        extensions: ['ts'],
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(argv.mode || 'development'),
        __BROWSER__: true,
        __DEV__: !isProd,
      }),
      // new webpack.ContextReplacementPlugin(
      //   /date-fns[/\\]/,
      //   new RegExp(`[/\\\\](${supportedLocales.join('|')})[/\\\\]index.js$`),
      // ),
      // new FaviconsWebpackPlugin('./src/img/favicon.png')
    ],

    optimization: {
      runtimeChunk: 'single',
      usedExports: true,
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000,
      },
    },
  };

  if (isProd) {
    config.plugins.push(
      new MiniCssExtractPlugin({ filename: '[name][hash:5].css' }),
    );
  }

  // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  //   .BundleAnalyzerPlugin;
  // config.plugins.push(new BundleAnalyzerPlugin());

  return config;
};
