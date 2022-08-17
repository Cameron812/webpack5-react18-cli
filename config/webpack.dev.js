const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getStyleLoader = (loader) => {
  return [
    'style-loader',
    'css-loader',
    {
      //配合package.json中定义的browserslist来指定兼容性处理
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
    loader,
  ].filter(Boolean);
};

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: undefined,
    filename: 'dist/js/[name].js',
    chunkFilename: 'dist/js/[name].chunk.js', //指定非入口文件打包的名称, 如node_modules或使用dynamic import引用的文件
    assetModuleFilename: 'dist/media/[name].[contenthash:10][ext]', //指定资源文件的输出路径
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.less$/,
        use: getStyleLoader('less-loader'),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoader('sass-loader'),
      },
      {
        test: /\.styl$/,
        use: getStyleLoader('stylus-loader'),
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          // 设置图片打包条件：
          dataUrlCondition: {
            //图片大于10k时打包输出，否则使用base64内联
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|ttf)$/,
        type: 'asset/resource',
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
            cacheCompression: false, //不使用压缩
            plugins: ['react-refresh/babel'], //enable JS HMR
          },
        },
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      //A string indicating the root of your files.
      context: path.resolve(__dirname, '../src'),
      exclude: 'node_modules',
      //开启缓存
      cache: true,
      //设置缓存路径
      cacheLocation: path.resolve(
        __dirname,
        '../node_modules/.cache/.eslintcache'
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new ReactRefreshWebpackPlugin(), //enable JS HMR
  ],
  devtool: 'cheap-module-source-map',
  optimization: {
    //将🚰的模块拆分打包，条件：新的chunk可以被共享，或者模块来自于 node_modules 文件夹
    splitChunks: {
      chunks: 'all', //设置为all可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
    },
    //会为每个入口添加一个只含有 runtime 的额外 chunk，当引用的模块重新打包时，入口文件不会重现打包，避免缓存失效
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`,
    },
  },
  resolve: {
    //尝试按顺序解析这些后缀名
    extensions: ['.jsx', '.js', '.json'],
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true, //解决前端路由404的问题
  },
};
