import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from "@/views/home/index.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/base/login/index.vue")
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/base/about/index.vue"),
        meta: {
            yaoqiuDenglu: true
        }
    },
    {
        path: '/testTable',
        name: "testTable",
        component: () => import("@/views/base/testTable/index.vue"),
    },
    {
        path: '/error',
        component: () => import("@/views/base/error/index.vue")
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'lost',
        redirect: '/error'
      }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false,
});

router.beforeEach((to, from, next) => {
    if (to.meta.yaoqiuDenglu) {
        if (!localStorage.getItem('token')) {
            console.log('你根本没有登录！！！');
            
            next('/')
        }
    }

    next();
})

export default router;