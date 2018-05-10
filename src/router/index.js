import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'

Vue.use(Router)

export default () => {
    return new Router({
        mode: 'history',
        fallback: false,
        routes: [
            {
                // mode: 'history',
                path: '/',
                name: 'HelloWorld',
                component: HelloWorld,
            },
            {
                // mode: 'history',
                path: '/test',
                name: 'Test',
                component: Test,
                // component: () => import('../components/Test.vue'),
            },
        ],
    })
}
