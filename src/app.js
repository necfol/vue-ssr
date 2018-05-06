// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
// import App from './components/HelloWorld.vue'
import createRouter from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//     el: '#app',
//     router,
//     components: { App },
//     template: '<App/>',
// })
export default () => {
    const router = createRouter()
    const app = new Vue({
        router,
        template: '<App/>',
        render: h => h(App),
    })
    return { app, router }
}
