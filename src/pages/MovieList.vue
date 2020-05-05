<template>
    <div class="container">

        <!--        导航头header部分-->
        <div class="header">
            <img style="margin-left: 70px; margin-top: 15px" src="../assets/img/logo.png" height="50" width="50">
            <span slot="title" class="title">UPC Online</span>

            <el-dropdown style="position: absolute; margin-top: 20px; margin-left: 1250px" placement="bottom">
                <el-button type="info" icon="el-icon-user-solid" circle></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-show="this.islogin" @click.native="userInfo">我的</el-dropdown-item>
                    <el-dropdown-item v-show="!this.islogin" @click.native="userLogin">登录</el-dropdown-item>
                    <el-dropdown-item v-show="this.islogin" @click.native="userLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-radio-group style="margin-top: 150px; margin-left: 20px" v-model="movieclassify">
            <el-radio-button label="热映影片"></el-radio-button>
            <el-radio-button label="即将上映"></el-radio-button>
        </el-radio-group>

<!--        <h3 style="margin-top: 150px; margin-left: 20px">{{movieclassify}}</h3>-->

<!--        热映影片，即将上映影片展示区域-->
        <div class="movie_content">
            <el-row>
                <el-col :span="4" v-for=" (i , index)  in MovieNum " :offset="0" :key="index">
                    <el-card class="movie_card">
                        <p>{{MovieInfoList[index].moviename}}</p>
                        <img :src="MovieUrlList[index]" height="220" width="100%">
                        <p>电影类型：{{MovieInfoList[index].movietype}}</p>
                        <p>电影主演：{{MovieInfoList[index].movieactor}}</p>
                        <p>发行时间：{{MovieInfoList[index].moviepublicdate}}</p>
                    </el-card>
                </el-col>
            </el-row>
        </div>


    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MovieList",
        data() {
            return {

                // 影片类型：热映影片 or 即将上映
                movieclassify: window.localStorage.getItem("movieclassify"),

                // 影片数量
                MovieNum: '',

                // 影片封面图URL列表
                MovieUrlList: [],

                // 影片信息列表
                MovieInfoList: [],

                // 登录状态
                islogin:false,

            }
        },
        created() {

            // 获取登录状态，判断是否需要登录，根据状态显示按钮
            this.islogin = window.localStorage.getItem("islogin");

            // 如果
            if (window.localStorage.getItem("movieclassify") === '热映影片') {
                this.getAllHotMovie();
            }
            if (window.localStorage.getItem("movieclassify") === '即将上映') {
                this.getAllUpcomingMovie();
            }
        },
        methods: {

            // refresh(movieclassify){
            //     window.localStorage.setItem('movieclassify',movieclassify);
            //     this.$router.go(0);
            //     console.log(movieclassify);
            // },

            getAllHotMovie() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/movie/hot_movie_list',
                }).then(res => {
                    this.MovieNum = res.data.length;
                    for (let i = 0; i < res.data.length; i++) {
                        let imgurl = "data:image/*;base64," + res.data[i].file;
                        this.MovieUrlList.push(window.URL.createObjectURL(this.dataURLtoBlob(imgurl)));
                        this.MovieInfoList.push(res.data[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            getAllUpcomingMovie() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/movie/upcoming_movie_list',
                }).then(res => {
                    this.MovieNum = res.data.length;
                    for (let i = 0; i < res.data.length; i++) {
                        let imgurl = "data:image/*;base64," + res.data[i].file;
                        this.MovieUrlList.push(window.URL.createObjectURL(this.dataURLtoBlob(imgurl)));
                        this.MovieInfoList.push(res.data[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 将接收的后端base64格式字符串转为blob对象
            dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: mime});
            },

            //islogin为false，转到登录页面
            userLogin(){
                this.$router.push("/user/login");
            },

            //islogin为true，转到用户信息页面
            userInfo(){
                this.$router.push("/user/userinfo");
            },

            //islogin为true，用户退出系统
            userLogout(){
                window.localStorage.removeItem("islogin");
                window.localStorage.removeItem("userid");
                this.$router.go(0);
            },


        }
    }
</script>

<style scoped>

    .container {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .header {
        position: absolute;
        height: 80px;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 0 8px 1px #ccc;
    }

    .title {
        position: absolute;
        margin-top: 15px;
        padding-left: 25px;
        font-size: 40px;
        font-weight: bolder;
    }

    .movie_content {
        margin-top: 80px;
    }

    .movie_card {
        width: 210px;
        margin-left: 15px;
        margin-bottom: 25px;
        border-radius: 30px;
        overflow: hidden; /*溢出的部分隐藏*/
        white-space: nowrap; /*文本不换行*/
        text-overflow: ellipsis; /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
    }

    .movie_card :hover {
        color: #1da2ff;
        border-color: #1da2ff;
    }

</style>