import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      root: path.join(__dirname, './src'),
      components: path.join(__dirname, './src/components')
    },
  },
  devtool: 'eval-source-map',
  entry: {
    client: path.resolve(__dirname, 'src/index.js')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        use: ['babel-loader'],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.ico$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'less-loader?sourceMap']
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true,
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        context: '/',
        postcss: () => [autoprefixer],
      }
    })
  ]

};
