const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
  public: path.resolve(__dirname,'public')
}

const htmlConfig = {
  template: path.join(paths.public, 'index.html'),
  favicon: path.join(paths.public, 'favicon.ico'),
  hash: true,
  minify : {
    collapseWhitespace: true,
  }
}

const common = {
  entry: path.join(paths.src, 'index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: paths.build,
    filename: 'bundle.[hash].js',
    publicPath: '/build/', // change to this by adding the <base> back in
    // publicPath: '/',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                'import',
                {
                  libraryName: '@mui/material',
                  libraryDirectory: '',
                  camel2DashComponentName: false,
                },
                '@mui/material',
              ],
              [
                'import',
                {
                  libraryName: '@mui/icons-material',
                  libraryDirectory: '',
                  camel2DashComponentName: false,
                },
                '@mui/icons-material',
              ],
            ]
          }
        }
      },
      {
        test: /\.(ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: false,
          }
        }
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // publicPath: "/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(htmlConfig),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
  ]
};

const devSettings = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    quiet: false,
    writeToDisk: true,
    proxy: {
      '/api/**': { target: 'http://localhost:3000' }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ]
}

const prodSettings = {
  optimization: {
    minimize: true,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({ 'process.env': {
      NODE_ENV: JSON.stringify('production')
    }}),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

/**
* Exports
**/

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

if (TARGET === 'start') {
  module.exports = merge(common, devSettings)
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(common, prodSettings)
}