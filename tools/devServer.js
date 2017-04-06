'use strict'
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('../webpack.config.dev')
import config from '../build/config'

const app = express()

const port = config.port


webpackConfig.entry.client = [
  `webpack-hot-middleware/client?reload=true`,
  webpackConfig.entry.client
]

let compiler

try {
  compiler = webpack(webpackConfig)
} catch (err) {
  console.log(err.message)
  process.exit(1)
}

const devMiddleWare = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
})

// const _target = 'http://192.168.10.234:8080'
const _target = 'http://ssppre.adbaitai.com'

// proxy api requests
var proxyTable = {
  '/ssp': {
    target: _target,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/api': {
    target: _target,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/user': {
    target: _target,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/1.0': {
    target: _target,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/public': {
    target: _target,
    changeOrigin: true,
    logLevel: 'debug',
  },
  '/h5': {
    target: _target,
    changeOrigin: true,
    logLevel: 'debug',
  },
}

Object.keys(proxyTable)
  .forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {
        target: options,
        logLevel: 'debug'
      }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })


app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
}))

const mfs = devMiddleWare.fileSystem
const file = path.join(webpackConfig.output.path, 'index.html')


devMiddleWare.waitUntilValid()

app.get('*', (req, res) => {
  devMiddleWare.waitUntilValid(() => {
    const html = mfs.readFileSync(file)
    res.end(html)
  })
})

app.listen(port)
