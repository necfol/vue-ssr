const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
    entry: './src/entry-client.js',
    output: {
        filename: 'vue-ssr-client-bundle.js',
    },
    plugins: [
        // new VueSSRServerPlugin()
    ],
})
