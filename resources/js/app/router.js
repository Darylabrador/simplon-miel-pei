import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'welcome',
        //     component: Welcome
        // },
        // {
        //     path: '/connexion',
        //     name: 'login',
        //     component: Login
        // },
        // {
        //     path: '/inscription',
        //     name: 'register',
        //     component: Register
        // },
        // {
        //     path: '/reinitialisation',
        //     name: 'reset',
        //     component: ResetPassword
        // },
        // {
        //     path: '/reinitialisation/:token',
        //     name: 'resettoken',
        //     component: ResetPassword
        // },
        // {
        //     path: '/email/verification/:token',
        //     name: 'verifymail',
        //     component: VerifyEmail
        // },
        // {
        //     path: '/dashboard',
        //     name: 'dashboard',
        //     component: Dashboard,
        //     meta: { requiresAuth: true }
        // },
    ]
});


router.beforeEach((to, from, next) => {
    function isLogged() {
        return localStorage.getItem('tmaasToken');
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogged()) {
            return next({ path: "/connexion" });
        }
    }
    return next();
});


export default router;