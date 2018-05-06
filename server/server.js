const Vue = require('vue')
const server = require('express')()
// const { createBundleRenderer } = require('vue-server-renderer')
import createApp from '../dist/vue-ssr-server-bundle.js'
// const renderer = createBundleRenderer(serverBundle, {
//   runInNewContext: false, // 推荐
//   template, // （可选）页面模板
//   clientManifest // （可选）客户端构建 manifest
// })
// const renderer = require('vue-server-renderer').createRenderer()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8'),
})
server.get('*', (req, res) => {
    const context = { url: req.url }
    createApp(context)
        .then(app => {
            renderer.renderToString(app, { title: 'fuck' }, (err, html) => {
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
