<template>
    <div>
        <h1 class="title">资讯列表</h1>
        <div v-for=" (i, index) in this.allNewsList_length " :key="index">
            <el-card class="box-card" shadow="hover">
                <div slot="header">
                    <span class="text">
                        <p style="font-style: oblique; font-weight: bold;">{{i}}、{{allNewsList_Title[i-1]}}</p>
                        <p style="font-size: 10px">{{allNewsList_AddTime[i-1]}}</p></span>
                </div>
                <div>
                    <p>{{allNewsList_News[i-1]}}</p>
                </div>
            </el-card>
        </div>
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
                allNewsList_Title: [],
                allNewsList_AddTime: [],
                allNewsList_News: [],
                allNewsList_length:''
            }
        },
        created() {

            axios({
                method: 'get',
                url: this.$axios.defaults.baseURL + '/user/news/news_list',
            }).then(res => {
                this.allNewsList_length=res.data.length;
                for (let i = 0; i < res.data.length; i++) {
                    this.allNewsList_Title.push(res.data[i].newstitle);
                    this.allNewsList_News.push(res.data[i].news);
                    this.allNewsList_AddTime.push(res.data[i].newsaddtime.slice(0,19).replace("T"," "));
                }
            }).catch(error => {
                console.log(error);
            })

        },
    }
</script>

<style scoped>
    .title{
        padding-left: 45%;
    }

    .text {
        font-size: 16px;
    }

    .box-card {
        margin-bottom: 50px;
        margin-left: 16%;
        width: 1000px;
        border-width: 4px;
        border-color: azure;
    }

</style>