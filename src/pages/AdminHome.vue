<template>
    <div id="app">
        <div id="home">
<!--            导航头header部分-->
            <el-row class="header">
                <div class="head-bar">
                    <img src="../assets/img/logo.png" height="50" width="50">
                    <span slot="title" style="padding-left:25px;font-size: 40px;font-weight: bolder;">UPC Online</span>
                </div>
            </el-row>

<!--            导航栏部分-->
            <el-row class="container">
                <div class="section">
                    <div class="nav-bar">
                        <el-menu :default-active="currentMenuIndex" class="el-menu-vertical">

                            <el-menu-item index="/user_manage" @click="handleMenuItemClick('/user_manage')">
                                <i class="el-icon-user-solid"></i>
                                <span slot="title">用户管理</span>
                            </el-menu-item>

                            <el-menu-item index="/movie_manage" @click="handleMenuItemClick('/movie_manage')">
                                <i class="el-icon-video-camera-solid"></i>
                                <span slot="title">电影管理</span>
                            </el-menu-item>

                            <el-menu-item index="/movie_schedule" @click="handleMenuItemClick('/schedule_manage')">
                                <i class="el-icon-s-fold"></i>
                                <span slot="title">排片管理</span>
                            </el-menu-item>

                            <el-menu-item index="/news_manage" @click="handleMenuItemClick('/news_manage')">
                                <i class="el-icon-s-comment"></i>
                                <span slot="title">资讯管理</span>
                            </el-menu-item>

                            <el-menu-item index="/order_manage" @click="handleMenuItemClick('/order_manage')">
                                <i class="el-icon-s-ticket"></i>
                                <span slot="title">订单管理</span>
                            </el-menu-item>
                        </el-menu>
                    </div>
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
                currentMenuIndex: '/user_manage'
            };
        },
        created() {

        },
        methods: {
            // 导航栏跳转
            handleMenuItemClick(path) {
                this.$router.push('/admin' + path);
                this.currentMenuIndex = path;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        min-width: 1200px;
        background-color: #f5f5f5;
    }

    .container .section {
        width: 80%;
        min-width: 1200px;
        display: flex;
        justify-content: right;
        align-content: flex-start;
        height: 100%;
        box-sizing: border-box;
        margin-top: 30px;
    }

    .nav-bar {
        width: 10%;
        min-width: 200px;
        border-bottom: 1px solid #e9eaeb;
    }

    .container .content {
        display: flex;
        justify-content: center;
        align-content: flex-start;
        width: 90%;
        min-width: 1000px;
        height: 720px;
        padding-top: 30px;
        background-color: #fff;
        border: 1px solid #e9eaeb;
        border-left: none;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
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

    /*#home .el-dropdown-link {*/
    /*    cursor: pointer;*/
    /*    font-size: 14px;*/
    /*}*/
    /*#home .el-dropdown-link:hover {*/
    /*    color: #409eff;*/
    /*}*/
    /*#home .el-icon-arrow-down {*/
    /*    font-size: 12px;*/
    /*}*/
    #home .el-menu {
        border: none;
        border: 1px solid #e9eaeb;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .05);
    }

    #home .el-menu-item {
        height: 50px;
        line-height: 50px;
    }

    #home .el-menu-item, #home .el-menu-item i {
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
