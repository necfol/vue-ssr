import Vue from 'vue'
import createApp from './app.js'

let { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
Vue.mixin({
    async beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        try {
            asyncData && (await asyncData({ store: this.$store, route: to }))
        } catch (e) {}
        next()
    },
})

router.onReady(() => {
    router.beforeResolve(async (to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c)
        })
        // if (!activated.length) {
        //   return next()
        // }

        // 这里如果有加载指示器(loading indicator)，就触发

        try {
            activated.length &&
                (await Promise.all(
                    activated.map(
                        ({ asyncData }) =>
                            asyncData && asyncData({ store, route: to }),
                    ),
                ))
        } catch (e) {}
        next()
    })
    app.$mount('#app')
})
