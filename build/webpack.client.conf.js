const merge = require('webpack-merge')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const baseConfig = require('./webpack.base.conf.js')

module.exports = merge(baseConfig, {
    entry: {
        app: './src/entry-client.js',
    },
    // output: {
    //     filename: 'vue-ssr-client-bundle.js',
    //     chunkFilename: '[name].bundle.js',
    // },
    plugins: [
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin(),
    ],
    optimization: {
        splitChunks: {
            name: 'vendors',
            chunks: 'initial',
        },
        runtimeChunk: {
            name: 'manifest',
        },
    },
})
