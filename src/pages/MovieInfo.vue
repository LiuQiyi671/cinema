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

        <!--        影片信息详情-->
        <div class="movie_content">
            <el-row>
                <el-col :span="8">
                    <img :src="movieUrl" height="330" width="240" style="margin-left: 200px; margin-top: 30px">
                    <p style="margin-left: 290px; margin-top: 10px">{{moviewishpeoplenum}}人想看 </p>
                    <el-button v-if="isInWishmovieList" type="danger" style="margin-left: 270px; margin-top: 10px"
                               @click="cancelWish">取消想看
                    </el-button>
                    <el-button v-if="!isInWishmovieList" type="danger" style="margin-left: 280px; margin-top: 10px"
                               @click="wish">想看
                    </el-button>
                </el-col>
                <el-col :span="12">
                    <p style="font-size: 24px; font-weight: bold">{{movieInfo.moviename}}</p>
                    <p>影片主演：{{movieInfo.movieactor}}</p>
                    <p>影片类型：{{movieInfo.movietype}}</p>
                    <p>发行国家：{{movieInfo.moviecountry}}</p>
                    <p>发行时间：{{movieInfo.moviepublicdate}}</p>
                    <p>影片导演：{{movieInfo.moviedirector}}</p>
                    <p>影片语言：{{movieInfo.movielanguage}}</p>
                    <p>影片时长：{{movieInfo.movieduration}}</p>
                    <p>影片简介：{{movieInfo.moviedescription}}</p>

                    <!--            影片场次显示表格-->
                    <div class="schedule_table">
                        <el-table border stripe :data="scheduleList">
                            <el-table-column label="日期" align="center" prop=showdate></el-table-column>
                            <el-table-column label="时间" align="center" prop="showtime"></el-table-column>
                            <el-table-column label="影厅" align="center" prop="hallname"></el-table-column>
                            <el-table-column label="票价" align="center" prop="price"></el-table-column>
                            <el-table-column label="操作" width="200" align="center">
                                <template slot-scope="scope" v-if="scope.row">
                                    <el-button type="primary" @click="buyTicket(scope.row.scheduleid)">购票</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--                    <el-button type="primary" style="margin-top: 30px; margin-left: 680px" @click="buyTicket">购票</el-button>-->
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MovieInfo",
        data() {
            return {

                // 登录状态
                islogin: window.localStorage.getItem("islogin"),

                // 用户id
                userid: window.localStorage.getItem("userid"),

                // 影片封面图URL
                movieUrl: '',

                // 影片信息
                movieInfo: '',

                // 想看影片id列表
                wishmovieIdList: [],

                // 用户想看影片数量
                wishmovieNum: '',

                // 判断当前影片是否存在于用户想看影片列表的状态
                isInWishmovieList: false,

                // 此影片所有排片列表
                scheduleList: [],

                moviewishpeoplenum: '',

            }
        },
        created() {

            // 获取影片类型
            this.movieclassify = this.$route.params.movieclassify;

            // 获取登录状态，判断是否需要登录，根据状态显示按钮
            this.islogin = window.localStorage.getItem("islogin");

            // 获取影片信息详情
            this.getMovieDatail();

            // 获取想看影片wishmovieid列表
            this.getWishmovieIdList();

            // 根据影片id获取所有场次信息
            this.getAllScheduleInfo();

            this.getWishpeoplenumByMovieid();


        },
        methods: {

            // 获取影片信息详情
            getMovieDatail() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/movie/movie_info',
                    params: {'id': this.$route.params.movieid}
                }).then(res => {
                    let imgurl = "data:image/*;base64," + res.data.file;
                    this.movieUrl = window.URL.createObjectURL(this.dataURLtoBlob(imgurl));
                    this.movieInfo = res.data;
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
            userLogin() {
                this.$router.push("/user/login");
            },

            //islogin为true，转到用户信息页面
            userInfo() {
                this.$router.push("/user/userinfo");
            },

            //islogin为true，用户退出系统
            userLogout() {
                window.localStorage.removeItem("islogin");
                window.localStorage.removeItem("userid");
                this.$router.go(0);
            },

            // 获取想看影片wishmovieid列表
            getWishmovieIdList() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/getwishmovie/',
                    params: {"userid": this.userid}
                }).then(res => {
                    this.wishmovieNum = res.data.length;
                    for (let i = 0; i < res.data.length; i++) {
                        this.wishmovieIdList.push(res.data[i]);
                        if (this.$route.params.movieid === res.data[i]) {
                            this.isInWishmovieList = true;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            getWishpeoplenumByMovieid() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/getmoviewishpeoplenum',
                    params: {'movieid': this.$route.params.movieid}
                }).then(res => {
                    this.moviewishpeoplenum = res.data;
                }).catch(error => {
                    console.log(error);
                })
            },

            // 用户取消想看影片
            cancelWish() {
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/user/removewishmovie',
                    params: {'movieid': this.$route.params.movieid, 'userid': this.userid}
                }).then(res => {
                    console.log(res);
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 用户添加想看影片
            wish() {
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/user/addwishmovie',
                    data: {'wishmovieid': 0, 'movieid': this.$route.params.movieid, 'userid': this.userid}
                }).then(res => {
                    console.log(res);
                    this.$router.go(-1);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 用户购票，跳转到购票页面
            buyTicket(scheduleid) {
                this.$router.push({
                    name: 'movieseat',
                    params: {'scheduleid': scheduleid, 'moviename': this.movieInfo.moviename}
                })
            },

            // 根据影片id获取所有场次信息
            getAllScheduleInfo() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/schedule/schedule_list',
                    params: {id: this.$route.params.movieid}
                }).then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        this.scheduleList.push(res.data[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
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
        margin-top: 140px;
    }

    .schedule_table {
        margin-top: 30px;
    }


</style>