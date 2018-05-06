import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default () => {
    return new Router({
        routes: [
            {
                mode: 'history',
                path: '/',
                name: 'HelloWorld',
                component: HelloWorld,
            },
        ],
    })
}
