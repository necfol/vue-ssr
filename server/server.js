const Vue = require('vue')
const express = require('express')
const server = express()
const createApp = require('../dist/vue-ssr-server-bundle.js').default
// import createApp from '../dist/vue-ssr-server-bundle.js'
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./src/index.template.html', 'utf-8'),
})
server.use('/dist', express.static('./dist'))
server.get('*', (req, res) => {
    const context = { url: req.url }
    createApp(context)
        .then(app => {
            renderer.renderToString(app, context, (err, html) => {
                if (err) {
                    if (err.code === 404) {
                        res.status(404).end('Page not found')
                    } else {
                        console.log(err)
                        res.status(500).end('Internal Server Error')
                    }
                } else {
                    res.end(html)
                }
            })
        })
        .catch(err => {
            console.log('catch err', req.url, err)
        })
})
server.listen(8082)
