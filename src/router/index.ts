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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false,
})

export default router;