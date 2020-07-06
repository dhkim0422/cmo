const path = require('path');
const webpack = require('webpack');
const loader = {
    loader: 'sass-resources-loader',
    options: {
      sourceMap: true,
      resources: path.resolve(__dirname, './src/scss/main.scss')
    }
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8000, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: true,
    proxy: { // proxyTable 설정
      '/isg-oreo': {
        target: 'http://localhost:8080',
        ws: false,
        changeOrigin: true
      }
    }
  },
// The configure Web pack is the place in Vue CLI 3.0 to configure the parameters of the webpack plug-in. If you set it here, it will create or override the default configuration of the webpack.
// The meaning of webpack ProvidePlugin is to create a global variable that can be used within each module of webpack. The configuration meaning here is to create three variables'$','jQuery','window. jQuery'pointing to jQuery dependency and'Popper' pointing to popper. JS dependency.
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            loader,
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: [ '*', '.js', '.vue' ],
      alias: {
          'jquery': 'jquery/dist/jquery.slim.js'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default']
      }),
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/main.scss";`
      }
    },
    sourceMap: true,
    // extract: true
  },

  outputDir: 'D:/eGovFrameDev-3.8.0-64bit/workspace/argene/src/main/webapp/dist',
  // outputDir: 'D:/eGovFrameDev-3.8.0-64bit/workspace/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/argene/dist',

  publicPath: process.env.NODE_ENV === 'production'
    ? '/cmo/dist/'
    : '/cmo'


}
