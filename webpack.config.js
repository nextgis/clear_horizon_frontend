const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

let alias = {};
try {
  const { getAliases } = require('./nextgisweb_frontend/build/aliases');
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
      main: ['./src/main.ts']
    },

    output: {
      filename: '[name][hash:7].js'
    },

    resolve: {
      extensions: ['.js', '.ts', '.json'],
      alias
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { sourceMap: true } }]
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
                // options...
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]-[hash:7].[ext]'
          ]
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name]-[hash:7].[ext]'
          ]
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: ['file-loader?name=fonts/[name]-[hash:7].[ext]']
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ['file-loader?name=images/[name].[ext]', 'image-webpack-loader?bypassOnDebug']
        }
      ]
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin({ vue: true }),
      new MiniCssExtractPlugin({ filename: '[name][hash:7].css', allChunks: true }),
      new HtmlWebpackPlugin({ template: 'src/index.html' })
      // new FaviconsWebpackPlugin('./src/img/favicon.png')
    ],

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000
      }
    }
  };

  return config;
};
