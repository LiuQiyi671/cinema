<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <span class="text1">实时票房排名</span>
            </div>
            <div v-for="i in 10" :key="i" class="text">
                <p>{{i}}、{{responseResult[i-1]}}</p>
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header">
                <span class="text1">影片资讯</span>
                <el-button type="text" class="all_news_list_button" @click="getAllNews">全部>></el-button>
            </div>
            <div v-for="i in 10" :key="i" class="text">
                <p>{{i}}、{{shortNewsList[i-1]}}</p>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "MovieList",
        data() {
            return {
                responseResult: ["士兵顺溜：兵王争锋", "为国而歌", "武圣关公", "天·火", "宠爱", "我和我的祖国", "魔镜奇缘3", "海林都", "利刃破冰", "我的间谍"],
                shortNewsList:[],
            }
        },
        created() {

            // axios({
            //     method: 'get',
            //     url: "http://api.avatardata.cn/BoxOffice/Internet?key=6114e9d4313743b094e134eb2f499203",
            // }).then(res => {
            //     console.log(res);
            // }).catch(error => {
            //     console.log(error);
            // })

            axios({
                method: 'get',
                url: this.$axios.defaults.baseURL+'/user/news/short_news_list',
            }).then(res => {
                console.log(res);
                for(let i=0; i<10; i++) {
                    this.shortNewsList.push(res.data[i].newstitle);
                }
            }).catch(error => {
                console.log(error);
            })

        },
        methods: {
            getAllNews(){
                this.$router.push("/user/newslist");
            }
        }
    }
</script>

<style scoped>
    .text1 {
        font-size: 18px;
        color: red;
    }

    .text {
        font-size: 14px;
    }

    .box-card {
        margin-top: 50px;
        margin-left: 1200px;
        width: 300px;
    }

    .all_news_list_button{
        margin-left: 140px;
    }
</style>