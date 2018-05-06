import createApp from './app.js'
export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        router.push(context.url)
        router.onReady(() => {
            let isMatch = router.getMatchedComponents()
            if (!isMatch.length) {
                reject({ code: 404 })
            } else {
                console.log('这是拿来了', isMatch)
                resolve(app)
            }
        })
    })
}
