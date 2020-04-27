<template>
    <div>
        <h1 class="title">资讯列表</h1>
        <div class="container">
            <div v-for=" (i, index) in this.allNewsList_length " :key="index">
                <el-card class="box-card" shadow="hover">

                    <span class="text">
<!--                        资讯标题-->
                        <p style="font-style: oblique; font-weight: bold;">{{i}}、{{allNewsList_Title[i-1]}}</p>

<!--                        资讯发布时间-->
                        <p style="font-size: 10px; padding-left: 800px">{{allNewsList_AddTime[i-1]}}</p>
                    </span>

<!--                    资讯内容-->
                    <div>
                        <p>{{allNewsList_News[i-1]}}</p>
                    </div>
                </el-card>
            </div>
        </div>
<!--        回到顶部小组件-->
        <ScrollTop></ScrollTop>
    </div>
</template>

<script>
    import axios from "axios";
    import ScrollTop from "@/components/ScrollTop";

    export default {
        name: "NewsList",
        components: {ScrollTop},
        data() {
            return {

                // 所有资讯标题列表
                allNewsList_Title: [],

                // 所有资讯发布时间列表
                allNewsList_AddTime: [],

                // 所有资讯内容列表
                allNewsList_News: [],

                // 所有资讯总数量
                allNewsList_length: ''
            }
        },
        created() {

            // 获取所有资讯列表
            this.getAllNews();
        },

        methods: {

            // 获取所有资讯列表
            getAllNews() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/news/news_list',
                }).then(res => {
                    this.allNewsList_length = res.data.length;
                    for (let i = 0; i < res.data.length; i++) {
                        this.allNewsList_Title.push(res.data[i].newstitle);
                        this.allNewsList_News.push(res.data[i].news);
                        this.allNewsList_AddTime.push(res.data[i].newsaddtime);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        },
    }
</script>

<style scoped>
    .title {
        padding-left: 45%;
    }

    .text {
        font-size: 16px;
    }

    .container :hover {
        border-color: #1da2ff;
    }

    .box-card {
        margin-bottom: 50px;
        margin-left: 16%;
        width: 1000px;
        border-width: 2px;
    }

</style>