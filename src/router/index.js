import Vue from 'vue'
import Router from 'vue-router'
import MovieList from "@/pages/MovieList";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminLogin from "@/pages/AdminLogin";
import AdminHome from "@/pages/AdminHome";
import NewsList from "@/pages/NewsList";

Vue.use(Router);

const routes = [
    {
        path: '/home',
        component: MovieList,
    },
    {
        path: '/user/login',
        component: Login,
    },
    {
        path: '/user/register',
        component: Register,
    },
    {
        path: '/user/newslist',
        component: NewsList,
    },
    {
        path: '/admin/login',
        component: AdminLogin
    },
    {
        path: '/admin/home',
        component : AdminHome
    }

];


const router = new Router({
    mode: 'history',
    routes
});

export default router;
