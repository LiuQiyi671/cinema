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
import ScheduleManage from "@/pages/ScheduleManage";
import NewsManage from "@/pages/NewsManage";
import OrderManage from "@/pages/OrderManage";
import MovieInfo from "@/pages/MovieInfo";
import MovieSeat from "@/pages/MovieSeat";
import HotMovieManage from "@/pages/HotMovieManage";
import UpcomingMovieManage from "@/pages/UpcomingMovieManage";
import AdminEditMovie from "@/pages/AdminEditMovie";

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
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    {
        path: '/user/newslist',
        component: NewsList,
    },
    {
        name:'movielist',
        path: '/user/movielist/:movieclassify',
        component: MovieList,
    },
    {
        name:'moviedetail',
        path: '/user/moviedetail/:movieid',
        component: MovieInfo,
    },
    {
        name:'movieseat',
        path: '/user/movieseat/:scheduleid',
        component: MovieSeat,
    },


    // 管理员系统前端路由
    {
        path: '/admin/login',
        component: AdminLogin,
    },
    {
        path: '/admin/home',
        component: AdminHome,
        redirect: 'admin/user_manage',
    },
    {
        path: '/admin/user_manage',
        component: UserManage
    },
    {
        path: '/admin/hot_movie_manage',
        component: HotMovieManage
    },
    {
        path: '/admin/upcoming_movie_manage',
        component: UpcomingMovieManage
    },
    {
        path: '/admin/schedule_manage',
        component: ScheduleManage
    },
    {
        path: '/admin/news_manage',
        component: NewsManage
    },
    {
        path: '/admin/order_manage',
        component: OrderManage
    },
    {
        path:'/admin/addmovie',
        component: AdminAddMovie
    },
    {
        name: 'AdminEditMovie',
        path:'/admin/editmovie',
        component: AdminEditMovie
    }


];


const router = new Router({
    mode: 'history',
    routes
});

export default router;

//路由拦截
// let islogin = window.localStorage.getItem('islogin');
// let userid = window.localStorage.getItem("userid");
// console.log(islogin);
// console.log(userid);
//
// router.beforeEach((to,from,next)=>{
//     if(to.meta.requireAuth){ 	 //为true 需要通过验证才能跳入
//         if(islogin){							//如果islogin为true 则直接跳入路由
//             next();
//             console.log('我进入了路由');
//         }else{								//否则进入登录页 重新登录
//             next({
//                 path:'/user/login'
//             })
//         }
//     }else{								//不是为登录才能访问的页面直接跳转
//         next();
//     }
// })