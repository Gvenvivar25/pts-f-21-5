const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

// const fs = require('fs')
// const PATHS = {
//   src: path.join(__dirname, './src'),
//   dist: path.join(__dirname, './dist'),
//   assets: 'assets/',
// }

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

const cssLoaders = (loader) => {
  const styleLoader = isDev
    ? 'style-loader'
    : {
        loader: MiniCssExtractPlugin.loader,
        // options: {
        //   hrm: isDev,
        //   // reloadAll: true,
        // },
      }

  const loaders = [styleLoader, 'css-loader', 'postcss-loader']

  if (loader) {
    loaders.push(loader)
  }

  return loaders
}

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
    ],
  }

  if (preset) {
    options.presets.push(preset)
  }

  return options
}

const jsLoaders = (preset) => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(preset),
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist/public'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new HTMLWebpackPlugin({
      title: 'TEST WEBPACK',
      template: path.resolve(__dirname, './src/index.html'),
      filename: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
      pretty: true,
      // chunks: ['request', 'index'],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]

  // if (isProd) {
  //   base.push(new BundleAnalyzerPlugin());
  // }
  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: isDev ? 'development' : 'production',
  entry: {
    app: ['@babel/polyfill', './app.js'],
    // main: './pages/main.js',
    // api: './api/UsersAPI.js',
    // product: './src/pages/product.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.ts'],
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : false,
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000,
    hot: isDev,
  },
  plugins: plugins(),
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      // TypeScript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript'),
      },
      // public
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      // CSS, PostCSS, Sass
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.(s[ca]ss)$/,
        use: cssLoaders('sass-loader'),
      },
    ],
  },
}
