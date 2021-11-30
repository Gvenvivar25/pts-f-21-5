const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

const fs = require('fs')
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
}

// const PAGES_DIR = `${PATHS.src}/pug/pages/`;
// const PAGES = fs
//   .readdirSync(PAGES_DIR)
//   .filter((fileName) => fileName.endsWith('.pug'));

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

const cssLoaders = (loader) => {
  const styleLoader = isDev
    ? 'style-loader'
    : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hrm: isDev,
          reloadAll: true,
        },
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
    plugins: ['@babel/plugin-proposal-class-properties'],
  }

  if (preset) {
    options.presets.push(preset)
  }

  return options
}

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
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
      // filename: `./index.html`,
      minify: {
        collapseWhitespace: isProd,
      },
      pretty: true,
      // chunks: ['request', 'index'],
    }),
  ]

  // if (isProd) {
  //   base.push(new BundleAnalyzerPlugin());
  // }
  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    app: ['@babel/polyfill', './app.js'],
    main: './src/pages/main.js',
    api: './api/UsersAPI.js',
    product: './src/pages/product.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
  },
  optimization: optimization(),
  devtool: 'eval',
  devServer: {
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
        use: {
          loader: 'babel-loader',
          options: babelOptions(),
        },
      },
      // TypeScript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript'),
        },
      },
      // public
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      // CSS, PostCSS, Sass
      {
        test: /\.(css)$/,
        use: [cssLoaders()],
      },
      {
        test: /\.(s[ca]ss)$/,
        use: [cssLoaders('sass-loader')],
      },
      // {
      //   test: /\.s[ac]ss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {},
      //     },
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },

      // {
      //   test: /\.(png|jpg|svg|gif)$/,
      //   use: ['file-loader'],
      // },
      // {
      //   test: /\.(ttf|woff|woff2|eot)$/,
      //   use: ['file-loader'],
      // },
      // {
      //   test: /\.pug$/,
      //   use: {
      //     loader: 'pug-loader',
      //     options: {
      //       pretty: isDev,
      //     },
      //   },
      // },
    ],
  },
}
