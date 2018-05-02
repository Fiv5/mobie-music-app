'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const axios = require('axios')

// devServer dependencies
const express = require('express')
const app = express()
const apiRoutes = express.Router()

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    before(app) {
      // 歌单列表
      apiRoutes.get('/getDiscList', function(req, res) {
        const url =
          'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        const params = req.query
        axios
          .get(url, {
            headers: {
              referer: 'https://y.qq.com/portal/playlist.html'
            },
            params
          })
          .then(response => res.json(response.data))
          .catch(e => console.log(e))
      })
      // 歌手详情
      apiRoutes.get('/getSingerDetail', function(req, res) {
        const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
        const params = req.query
        const id = params.singermid
        axios
          .get(url, {
            headers: {
              referer: `https://y.qq.com/n/yqq/singer/${id}.html`
            },
            params
          })
          .then(response => res.json(response.data))
          .catch(e => console.log(e))
      })

      // 获取歌曲url路径参数vkey
      apiRoutes.get('/getSongUrl', (req, res) => {
        const url =
          'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
        axios
          .get(url, {
            headers: {
              referer: `https://y.qq.com/portal/player.html`
            },
            params: req.query
          })
          .then(response => {
            let ret = response.data
            if (typeof ret === 'string') {
              var reg = /^\w+\(({[^()]+})\)$/
              var mathes = ret.match(reg)
              if (mathes) {
                ret = JSON.parse(mathes[1])
              }
            }
            res.json(ret)
          })
          .catch(error => {
            console.log(error)
          })
      })
      // 歌单分类
      // apiRoutes.get('/getDiscList', function(req, res) {
      //   const url =
      //     'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'
      //   const params = req.query
      //   axios
      //     .get(url, {
      //       headers: {
      //         referer: 'https://y.qq.com/portal/playlist.html'
      //       },
      //       params
      //     })
      //     .then(response => res.json(response.data))
      //     .catch(e => console.log(e))
      // })

      // apiRoutes.get('/getDiscList', function(req, res) {
      //   const url = 'http://ustbhuangyi.com/music/api/getCdInfo'
      //   const params = req.query
      //   axios
      //     .get(url, {
      //       headers: {
      //         host: 'ustbhuangyi.com'
      //       },
      //       params
      //     })
      //     .then(response => res.json(response.data))
      //     .catch(e => console.log(e))
      // })

      app.use('/api', apiRoutes)
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      )

      resolve(devWebpackConfig)
    }
  })
})
