import Vue from 'vue'
import Router from 'vue-router'
import MovieList from "@/pages/MovieList";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminLogin from "@/pages/AdminLogin";
import AdminHome from "@/pages/AdminHome";
import NewsList from "@/pages/NewsList";
import UserManage from "@/pages/UserManage";
import AdminAddMovie from "@/pages/AdminAddMovie";
import Home from "@/pages/Home";
import UserInfo from "@/pages/UserInfo";

Vue.use(Router);

const routes = [
    {
        path: '/home',
        component: Home,
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
        path: '/user/userinfo',
        component: UserInfo,
    },
    {
        path: '/user/newslist',
        component: NewsList,
    },
    {
        path: '/user/movielist',
        component: MovieList,
    },
    {
        path: '/admin/login',
        component: AdminLogin
    },
    {
        path: '/admin/home',
        component: AdminHome,
        redirect: 'admin/user_manage'
    },
    {
        path: '/admin/user_manage',
        component: UserManage
    },
    {
        path:'/admin/addmovie',
        component: AdminAddMovie
    }


];


const router = new Router({
    mode: 'history',
    routes
});

export default router;
