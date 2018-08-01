import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/login/Login.vue';
import SignIn from '@/components/signIn/SignIn.vue';
import Index from '@/components/index/Index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: '',
            redirect: '/login'
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signIn',
            name: 'SignIn',
            component: SignIn
        }
    ]
});
