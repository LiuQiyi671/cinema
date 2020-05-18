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

        <!--        票房部分-->
        <el-card class="box-card">
            <div slot="header">
                <span class="text1">实时票房排名</span>
            </div>
            <div v-for="i in 10" :key="i" class="text">
                <p>{{i}}、{{responseResult[i-1]}}</p>
            </div>
        </el-card>

        <!--        热映影片、即将上映影片部分-->
        <div class="movie_content">

            <!--            热映影片部分-->
            <p style="margin-left: 70px; font-size: 24px;color: #ff0000;">热映影片（{{this.hotMovieNum}}部)
                <el-button type="text" style="margin-left: 750px; font-size: 20px; color: #ff0000;"
                           @click="getMovieList('热映影片')">全部>>
                </el-button>
            </p>

            <el-row>
                <el-col :span="6" v-for=" (i , index)  in 8 " :offset="0" :key="index">
                    <el-card class="movie_card">
                        <p>{{shortHotMovieInfoList[index].moviename}}</p>
                        <img :src="shortHotMovieUrlList[index]" height="220" width="100%" @click="getMovieDatail(shortHotMovieInfoList[index].movieid)">
                        <p>电影类型：{{shortHotMovieInfoList[index].movietype}}</p>
                        <p>电影主演：{{shortHotMovieInfoList[index].movieactor}}</p>
                        <p>发行时间：{{shortHotMovieInfoList[index].moviepublicdate}}</p>
                    </el-card>
                </el-col>
            </el-row>

            <!--             即将上映影片部分-->
            <p style="margin-left: 70px; font-size: 24px;color: #ff0000;">即将上映（{{this.upcomingMovieNum}}部)
                <el-button type="text" style="margin-left: 750px; font-size: 20px; color: #ff0000;"
                           @click="getMovieList('即将上映')">全部>>
                </el-button>
            </p>

            <el-row>
                <el-col :span="6" v-for=" (i , index)  in 8 " :offset="0" :key="index">
                    <el-card class="movie_card">
                        <p>{{shortUpcomingMovieInfoList[index].moviename}}</p>
                        <img :src="shortUpcomingMovieUrlList[index]" height="220" width="100%" @click="getMovieDatail(shortUpcomingMovieInfoList[index].movieid)">
                        <p>电影类型：{{shortUpcomingMovieInfoList[index].movietype}}</p>
                        <p>电影主演：{{shortUpcomingMovieInfoList[index].movieactor}}</p>
                        <p>上映时间：{{shortUpcomingMovieInfoList[index].moviepublicdate}}</p>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <!--        娱乐资讯部分-->
        <el-card class="news-card">
            <div slot="header">
                <span class="text1">影片资讯</span>
                <el-button type="text" class="all_news_list_button" @click="getAllNews">全部>></el-button>
            </div>
            <div v-for="i in 10" :key="i" class="text">
                <el-link :underline="false" @click="getOneNews(shortNewsList[i-1].newsid)">{{i}}、{{shortNewsList[i-1].newstitle}}</el-link>
            </div>
        </el-card>

        <!--资讯内容查看Dialog页面-->
        <div>
            <el-dialog
                    style="margin-left: 500px;"
                    :title="dialog_title"
                    :visible.sync="dialogFormVisible"
                    :modal-append-to-body="false"
                    v-if="dialogFormVisible"
                    :show-close="false"
            >
                <el-form :label-position="labelPosition" label-width="80px">
                    <el-form-item label="资讯标题" prop="newstitle">
                        <el-col :span="16">
                            <el-input type="textarea" :rows="2" v-model="oneNews.newstitle"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="资讯内容" prop="news">
                        <el-col :span="16">
                            <el-input type="textarea" :rows="10" v-model="oneNews.news"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">好 的</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Home",
        data() {
            return {
                //票房排名
                responseResult: ["士兵顺溜：兵王争锋", "为国而歌", "武圣关公", "天·火", "宠爱", "我和我的祖国", "魔镜奇缘3", "海林都", "利刃破冰", "我的间谍"],

                //前十条资讯
                shortNewsList: [],

                //热映影片封面图URL
                shortHotMovieUrlList: [],

                //即将上映影片封面图URL
                shortUpcomingMovieUrlList: [],

                //热映影片数量
                hotMovieNum: '',

                //即将上映影片数量
                upcomingMovieNum: '',

                //热映影片信息
                shortHotMovieInfoList: [],

                //即将上映影片信息
                shortUpcomingMovieInfoList: [],

                // 登录状态
                islogin:false,

                // 是否打开Dialog页面
                dialogFormVisible: false,

                // Dialog标题
                dialog_title:"查看资讯内容",

                // 表单域标签的位置
                labelPosition:"right",

                oneNews:'',
            }
        },
        created() {

            //获取实时票房排名
            // this.getBoxRanking();

            //获取前八条热映影片列表
            this.getShortHotMovieList();

            //获取前八条即将上映影片列表
            this.getShortUpcomingMovieList();

            //获取前十条资讯列表
            this.getShortNewsList();

            // 获取登录状态，判断是否需要登录，根据状态显示按钮
            this.islogin = window.localStorage.getItem("islogin");

        },
        methods: {

            // 获取票房排名
            getBoxRanking() {
                // axios({
                //     method: 'get',
                //     url: "http://api.avatardata.cn/BoxOffice/Internet?key=6114e9d4313743b094e134eb2f499203",
                // }).then(res => {
                //     console.log(res);
                // }).catch(error => {
                //     console.log(error);
                // })
            },

            // 获取前八条热映影片封面URL和信息
            getShortHotMovieList() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/movie/hot_movie_list',
                }).then(res => {
                    this.hotMovieNum = res.data.length;
                    for (let i = 0; i < 8; i++) {
                        let imgurl = "data:image/*;base64," + res.data[i].file;
                        this.shortHotMovieUrlList.push(window.URL.createObjectURL(this.dataURLtoBlob(imgurl)));
                        this.shortHotMovieInfoList.push(res.data[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 获取前八条即将上映影片封面URL和信息
            getShortUpcomingMovieList() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/movie/upcoming_movie_list',
                }).then(res => {
                    this.upcomingMovieNum = res.data.length;
                    for (let i = 0; i < 8; i++) {
                        let imgurl = "data:image/*;base64," + res.data[i].file;
                        this.shortUpcomingMovieUrlList.push(window.URL.createObjectURL(this.dataURLtoBlob(imgurl)));
                        this.shortUpcomingMovieInfoList.push(res.data[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 获取前十条娱乐资讯列表
            getShortNewsList() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/news/short_news_list',
                }).then(res => {
                    for (let i = 0; i < 10; i++) {
                        this.shortNewsList.push(res.data[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 获取全部娱乐资讯
            getAllNews() {
                // this.$router.push("/user/newslist");
                window.open("http://localhost:8080/user/newslist");
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

            // 获取全部热映影片列表
            getMovieList(movieclassify){
                this.$router.push({ name: 'movielist', params: { movieclassify:movieclassify }})
            },

            // 获取影片信息详情
            getMovieDatail(movieid){
                this.$router.push({ name: 'moviedetail', params: { movieid:movieid }});
            },

            // 获取某条资讯内容,打开显示到dialog页面
            getOneNews(id){
                for(let i=0; i<10; i++){
                    if(this.shortNewsList[i].newsid === id){
                        this.oneNews = this.shortNewsList[i];
                    }
                }
                this.dialogFormVisible = true;
            },

            // Dialog页面取消操作
            cancel(){
                this.$router.go(0);
            },


        },

    }
</script>

<style scoped>

    .container {
        position: relative;
        display: flex;
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

    .text1 {
        font-size: 18px;
        color: #ff0000;
    }

    .text {
        font-size: 14px;
    }

    .box-card {
        position: absolute;
        margin-top: 170px;
        margin-left: 1200px;
        width: 300px;
    }

    .news-card {
        position: absolute;
        margin-top: 770px;
        margin-left: 1200px;
        width: 300px;
    }

    .movie_content {
        margin-top: 150px;
        width: 1100px;
    }

    .movie_card {
        width: 210px;
        margin-left: 70px;
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

    .all_news_list_button {
        margin-left: 140px;
    }


</style>
