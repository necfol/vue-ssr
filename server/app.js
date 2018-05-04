const Vue = require('vue')
const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8'),
})
server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url,
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`,
    })
    const context = {
        title: 'hello',
        meta: `
      <meta ...>
      <meta ...>
    `,
    }
    renderer.renderToString(app, context, (err, html) => {
        console.log(html)
        // if (err) {
        //   res.status(500).end('Internal Server Error')
        //   return
        // }
        // res.end(`
        //   <!DOCTYPE html>
        //   <html lang="en">
        //     <head>
        //         <meta charset="utf-8">
        //         <title>Hello</title>
        //     </head>
        //     <body>${html}</body>
        //   </html>
        // `)
    })
})
server.listen(8082)
