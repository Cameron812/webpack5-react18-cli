const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const { extendDefaultPlugins } = require('svgo');
const getStyleLoader = (loader) => {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      //配合package.json中定义的browserslist来指定兼容性处理
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env']
        }
      }
    },
    loader
  ].filter(Boolean);
};

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:10].js',
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js', //指定非入口文件打包的名称, 如node_modules或使用dynamic import引用的文件
    assetModuleFilename: 'static/media/[name].[contenthash:10][ext]', //指定资源文件的输出路径
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader()
      },
      {
        test: /\.less$/,
        use: getStyleLoader('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader('sass-loader')
      },
      {
        test: /\.styl$/,
        use: getStyleLoader('stylus-loader')
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          // 设置图片打包条件：
          dataUrlCondition: {
            //图片大于10k时打包输出，否则使用base64内联
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(woff2?|ttf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        //配合bable.config.js设置presets
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, //使用缓存
            cacheCompression: false //不使用压缩
          }
        }
      }
    ]
  },
  plugins: [
    //new ESLintPlugin(options),
    //https://eslint.org/docs/latest/developer-guide/nodejs-api#-new-eslintoptions
    //https://github.com/webpack-contrib/eslint-webpack-plugin
    new ESLintPlugin({
      context: path.resolve(__dirname, '../src'), //指定根目录
      exclude: 'node_modules',
      cache: true, //开启缓存
      cacheLocation: path.resolve(
        //设置缓存路径
        __dirname,
        '../node_modules/.cache/.eslintcache'
      )
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:10].css',
      chunkFilename: 'static/css/[name].[contenthash:10].chunk.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          //从public目录下复制到dist目录下
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            // 复制时忽略index.html
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new BundleAnalyzerPlugin()
  ],
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin()
      //采用图片无损压缩的方式
      // new ImageMinimizerPlugin({
      //   minimizerOptions: {
      //     // Lossless optimization with custom option
      //     // Feel free to experiment with options for better result for you
      //     plugins: [
      //       ['gifsicle', { interlaced: true }],
      //       ['jpegtran', { progressive: true }],
      //       ['optipng', { optimizationLevel: 5 }],
      //       // Svgo configuration here https://github.com/svg/svgo#configuration
      //       [
      //         'svgo',
      //         {
      //           plugins: extendDefaultPlugins([
      //             {
      //               name: 'removeViewBox',
      //               active: false,
      //             },
      //             {
      //               name: 'addAttributesToSVGElement',
      //               params: {
      //                 attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
      //               },
      //             },
      //           ]),
      //         },
      //       ],
      //     ],
      //   },
      // }),
    ],
    //将引用的模块拆分打包，条件：新的chunk可以被共享，或者模块来自于 node_modules 文件夹
    // webpack根据下述条件自动进行代码块分割：
    // 新代码块可以被共享引用，OR这些模块都是来自node_modules文件夹里面
    // 新代码块大于30kb（min+gziped之前的体积）
    // 按需加载的代码块，最大数量应该小于或者等于5
    // 初始加载的代码块，最大数量应该小于或等于3
    splitChunks: {
      chunks: 'all', //设置为all可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          minChunks: 2
        }
      }
    },
    //会为每个入口添加一个只含有 runtime 的额外 chunk，当引用的模块重新打包时，入口文件不会重现打包，避免缓存失效
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`
    }
  },
  resolve: {
    //尝试按顺序解析这些后缀名
    extensions: ['.jsx', '.js', '.json']
  }
};
