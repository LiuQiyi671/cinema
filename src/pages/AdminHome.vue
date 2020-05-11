<template>
    <div id="app">
        <div id="home">
            <!--            导航头header部分-->
            <el-row class="header">
                <div class="head-bar">
                    <img src="../assets/img/logo.png" height="50" width="50">
                    <span slot="title" style="padding-left:25px;font-size: 40px;font-weight: bolder;">UPC Online</span>

                    <el-button style="position: absolute; margin-left: 1250px; z-index: 999" @click="adminLogout" type="info"
                               circle>退出
                    </el-button>

                </div>
            </el-row>

            <!--            导航栏部分-->
            <el-row class="container">
                <div class="nav-bar">
                    <el-menu :default-active="currentMenuIndex" class="el-menu-vertical">

                        <el-menu-item index="/user_manage" @click.native="handleMenuItemClick('/user_manage')">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>

                        <el-submenu index="/movie_manage" >
                            <span slot="title"><i style="color: black" class="el-icon-video-camera-solid"></i>电影管理</span>
                            <el-menu-item index="/hot_movie_manage" @click.native="handleMenuItemClick('/hot_movie_manage')">热映影片</el-menu-item>
                            <el-menu-item index="/upcoming_movie_manage" @click.native="handleMenuItemClick('/upcoming_movie_manage')">即将上映</el-menu-item>
                        </el-submenu>

                        <el-menu-item index="/movie_schedule" @click.native="handleMenuItemClick('/schedule_manage')">
                            <i class="el-icon-s-fold"></i>
                            <span slot="title">排片管理</span>
                        </el-menu-item>

                        <el-menu-item index="/news_manage" @click.native="handleMenuItemClick('/news_manage')">
                            <i class="el-icon-s-comment"></i>
                            <span slot="title">资讯管理</span>
                        </el-menu-item>

<!--                        <el-menu-item index="/order_manage" @click.native="handleMenuItemClick('/order_manage')">-->
<!--                            <i class="el-icon-s-ticket"></i>-->
<!--                            <span slot="title">订单管理</span>-->
<!--                        </el-menu-item>-->
                    </el-menu>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AdminHome",
        data() {
            return {

                // 当前所在导航栏
                currentMenuIndex: '/user_manage',
            };
        },
        created() {

        },
        methods: {

            // 导航栏跳转
            handleMenuItemClick(path) {
                this.$router.push('/admin' + path);
                this.currentMenuIndex = path;
            },

            // 管理员退出系统
            adminLogout() {
                this.$router.push('/admin/login');
            }
        }
    };
</script>

<style scoped>
    #home {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }

    .container {
        position: absolute;
        margin-top: 30px;
        margin-left: 160px;
    }

    .nav-bar {
        min-width: 140px;
        border-bottom: 1px solid #e9eaeb;
    }

</style>
<style scoped lang="stylus" ref="stylesheet/stylus">
    #app
        width 100%
        height 100%
        position fixed
        top 0
        left 0
        bottom 0
</style>
<style>
    #home .header {
        width: 100%;
        min-width: 1200px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 8px 1px #ccc;
        z-index: 9;
        background-color: #fff;
    }

    #home .header .head-bar {
        height: 100%;
        width: 80%;
        display: flex;
        justify-content: right;
        align-items: center;
        min-width: 1200px;
    }

    #home .el-menu {
        border: none;
        border: 1px solid #e9eaeb;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
    }

    #home .el-menu-item i {
        color: #3c4043;
    }

    #home .el-menu-item.is-active {
        color: #fff;
        background-color: #409eff;
    }

    #home .el-menu-item.is-active i {
        color: #fff;
    }
</style>
