const webpack = require('webpack')
const path = require('path')
const ProgressPlugin = require('webpack/lib/ProgressPlugin')

const vendors = [
  'antd',
  'axios',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux',
  'redux-thunk',
]

module.exports = {
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',

  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new ProgressPlugin(),

    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true,
      },
      output: {
        comments: false
      }
    }),
  ],
}
