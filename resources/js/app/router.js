import Vue from 'vue';
import VueRouter from 'vue-router';
import Accueil from './views/Accueil.vue';
import Login from './login/Login.vue';
import Register from './login/Register.vue';
import VerifyEmail from './login/VerifyEmail.vue';
import ResetPassword from './login/ResetPassword.vue';
import Producteur from './views/Producteur.vue';
import ProducteurList from './views/ProducteurList.vue';
import Miels from './views/Miels.vue';
import Panier from './views/Panier.vue';
import Commandes from './views/Commandes.vue';
import UserManagement from './views/UserManagement.vue';
import Store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'accueil',
            component: Accueil
        },
        {
            path: '/connexion',
            name: 'login',
            component: Login
        },
        {
            path: '/inscription',
            name: 'register',
            component: Register
        },
        {
            path: '/email/verification/:token',
            name: 'verifymail',
            component: VerifyEmail
        },
        {
            path: '/reinitialisation',
            name: 'reset',
            component: ResetPassword
        },
        {
            path: '/reinitialisation/:token',
            name: 'resettoken',
            component: ResetPassword
        },
        {
            path: '/producteurs',
            name: 'producteurs',
            component: ProducteurList
        },
        {
            path: '/producteur/:id',
            name: 'producteurDetails',
            component: Producteur
        },
        {
            path: '/panier',
            name: 'panier',
            component: Panier
        },
        {
            path: '/miels',
            name: 'miels',
            component: Miels
        },
        {
            path: '/commandes',
            name: 'commandes',
            component: Commandes,
            meta: { requiresAuth: true, adminAuth: false }
        },
        {
            path: '/utilisateurs',
            name: 'utilisateurs',
            component: UserManagement,
            meta: { requiresAuth: true, adminAuth: true }
        },
        {
            path: '*',
            name: '404',
            component: Accueil
        }
    ]
});

router.beforeEach((to, from, next) => {
    const { requiresAuth, adminAuth} = to.meta;

    if(requiresAuth && adminAuth) {
        if (Store.state.isLogged && Store.state.userRole != 1) {
            return next({ path: "/"});
        }
    } else if(requiresAuth && adminAuth == false) {
        if (!Store.state.isLogged) {
            return next({ path: "/" });
        } 
    }

    next();
});

export default router;