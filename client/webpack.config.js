const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ESBuildMinifyPlugin } = require('esbuild-loader')

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
      new ESBuildMinifyPlugin({
        target: 'es2019',
        css: true, // Apply minification to CSS assets
      }),
    ]
  }

  return config
}

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[chunkhash].${ext}`

const cssLoaders = (isModule = false, loader) => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: isModule,
      },
    },
    'postcss-loader',
  ]

  if (loader) {
    loaders.push(loader)
  }

  return loaders
}

// const babelOptions = (preset) => {
//   const options = {
//     presets: ['@babel/preset-env'],
//     plugins: [
//       '@babel/plugin-proposal-class-properties',
//       '@babel/plugin-transform-runtime',
//     ],
//   }

//   if (preset) {
//     options.presets.push(preset)
//   }

//   return options
// }

// const jsLoaders = (preset) => {
//   const loaders = [
//     {
//       loader: 'babel-loader',
//       options: babelOptions(preset),
//     },
//   ]

//   if (isDev) {
//     loaders.push('eslint-loader')
//   }

//   return loaders
// }

const jsLoaders = (loader) => {
  const loaders = [
    {
      loader: 'esbuild-loader',
      options: {
        loader: 'jsx',
        target: 'es2019',
        jsxFactory: 'CastomReact.createElement',
        jsxFragment: 'CastomReact.createFragment',
      },
    },
  ]

  if (loader) {
    loaders[0].options.loader = loader
  }

  if (isProd) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => {
  const base = [
    new webpack.ProvidePlugin({
      CastomReact: '/react/newVersion/creating',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/*.*',
          to: '[name][ext]',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: `styles/${filename('css')}`,
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      minify: isProd,
    }),
  ]

  // if (isProd) base.push(new BundleAnalyzerPlugin());

  return base
}

module.exports = {
  entry: {
    // app: ['@babel/polyfill', './app.js'],
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `js/${filename('js')}`,
    publicPath: '/',
  },
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  devtool: isDev ? 'source-map' : false,
  devServer: {
    watchFiles: 'src/**.html',
    historyApiFallback: true,
    compress: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      // {
      //   test: /\.jsx$/,
      //   exclude: /node_modules/,
      //   use: jsLoaders(null, true),
      // },
      // TypeScript
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('ts'),
      },
      // TypeScript
      // {
      //   test: /\.ts$/,
      //   exclude: /node_modules/,
      //   use: jsLoaders('@babel/preset-typescript'),
      // },
      // public
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: isDev
            ? '[path][name][ext]'
            : '[path][name][contenthash][ext]',
        },
      },
      // CSS, PostCSS, Sass
      {
        test: /\.css$/,
        use: cssLoaders(),
        exclude: /\.module\.css$/,
      },
      {
        test: /\.module.css$/,
        // include: /\.module\.css$/,
        use: cssLoaders(true),
      },
      {
        test: /\.(s[ca]ss)$/,
        use: cssLoaders(false, 'sass-loader'),
      },
    ],
  },
  optimization: optimization(),
  target: isDev ? 'web' : 'browserslist',
  plugins: plugins(),
  resolve: {
    extensions: ['.js', '.json', '.ts', '.jsx', '.tsx'],
  },
}
