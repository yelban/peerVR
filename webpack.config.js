const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
// const target = process.env.TARGET || 'web';

module.exports = {
  mode: env,

  target: env === 'development' ? 'web' : 'browserslist',

  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    // filename: "js/[name].js",
    filename: 'js/[name].[chunkhash:6].js',
    clean: true,
  },

  devtool: env === 'production' ? false : 'eval-source-map',

  devServer: {
    watchFiles: ['src/**/*.html'],
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    // contentBase: '/www/',
    // disableHostCheck: true,
    // host: 'localhost',
    // https: {
    //   key: fs.readFileSync('/Users/orz99/zoo/cert/localhost-key.pem'),
    //   cert: fs.readFileSync('/Users/orz99/zoo/cert/localhost.pem'),
    //   // disableHostCheck: true,
    //   // cert: '~/zoo/cert/localhost.pem',
    //   // key: '~/zoo/cert/localhost-key.pem',
    // },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        // exclude: /node_modules\/(?!(dom7|swiper|abscroll4|whatwg-.*)\/).*/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // (env === 'development' ? 'style-loader' : {
          //   loader: MiniCssExtractPlugin.loader,
          //   // options: {
          //   //   publicPath: '../',
          //   // },
          // }),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'sass-loader',
            // options: {
            //   sassOptions: {
            //     indentWidth: 2,
            //   }
            // },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // (env === 'development' ? 'style-loader' : {
          //   loader: MiniCssExtractPlugin.loader,
          //   // options: {
          //   //   publicPath: '../',
          //   // },
          // }),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.styl(us)?$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // (env === 'development' ? 'style-loader' : {
          //   loader: MiniCssExtractPlugin.loader,
          //   // options: {
          //   //   publicPath: '../',
          //   // },
          // }),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          {
            loader: 'stylus-loader',
            // options: {
            //   stylusOptions: {
            //     hoistAtrules: true,
            //   }
            // },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // type: 'asset/resource',
        type: 'asset',
        generator: {
          filename: 'assets/pic/[name]_[hash:6][ext][query]',
        },
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 1 * 1024, // 1kb
        //   },
        // },
        // loader: 'url-loader',
        // options: {
        //   limit: 1000,
        //   name: 'assets/pic/[name].[ext]',
        // },
        // type: 'javascript/auto',
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      // filename: "css/[name].css",
      filename: 'css/[name].[contenthash:6].css',
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
      inject: 'body',
      // excludeChunks: env === 'production' ? ['ie', 'popular', 'scroll', 'user'] : ['ie', 'user'],
      minify:
        env === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: false,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            }
          : false,
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
        },
      ],
    }),

    new webpack.ProgressPlugin(),
  ],

  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          format: {
            comments: false,
          },
        },
        extractComments: true,
      }),
    ],
  },
};
