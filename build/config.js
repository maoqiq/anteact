import autoprefixer from 'autoprefixer';

export default {
  port: 3000,
  publicPath: '/',
  babel: {},
  cssProcessors: [
    {loader: '', test: /\.css$/},
    {loader: 'sass-loader?sourceMap', test: /\.scss|\.sass$/},
    {loader: 'less-loader?sourceMap', test: /\.less$/},
  ],
  loadersOptions: () => {
    const isProd = process.env.NODE_ENV === 'production'

    generateLoader = (langs) => {
      langs.unshift('css-loader?sourceMap&-autoprefixer')
      if (!isProd) {
        return ['vue-style-loader'].concat(langs).join('!')
      }
      return ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: langs.join('!')
      })
    }

    return {
      minimize: isProd,
      debug: true,
      noInfo: true,

      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        context: '/',
        postcss: () => [autoprefixer],
      }
    }
  }

}
