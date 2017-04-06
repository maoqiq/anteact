import webpack from 'webpack'
const FriendlyErrors = require('friendly-errors-webpack-plugin')

import base from './webpack.base'
import config from './config'

process.env.NODE_ENV = 'development'


base.devtool = 'eval-source-map'
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrors()
)

// push loader for css files
config.cssProcessors.forEach(processor => {
  let loaders
  if (processor.loader === '') {
    loaders = ['postcss-loader']
  } else {
    loaders = ['postcss-loader', processor.loader]
  }
  base.module.rules.push({
    test: processor.test,
    use: ['style-loader', 'css-loader?sourceMap'].concat(loaders)
  })
})

module.exports = base
