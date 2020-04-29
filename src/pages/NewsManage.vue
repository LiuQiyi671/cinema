<template>
    <div>

        <!--        引入导航栏页面组件-->
        <div>
            <AdminHome></AdminHome>
        </div>

        <!--        对话框dialog-->

        <!--        :visible.sync="dialogVisible"   是否显示 Dialog，dialogVisible 为 true-->
        <!--        width="1096px"   Dialog的宽度为1096px-->
        <!--        :modal='false'   不需要遮罩层-->
        <!--        top="30px"   Dialog CSS 中的 margin-top 值-->
        <!--        :close-on-click-modal='false'   在Dialog外点击不会关闭Dialog-->
        <!--        :show-close='false'   不显示关闭按钮-->
        <!--        :append-to-body='true'   Dialog自身插入至body元素上-->
        <!--        :modal-append-to-body='false'   遮罩层不插入至body元素上-->
        <el-dialog
                class="dialog"
                :visible.sync="dialogVisible"
                width="1096px"
                :modal='false'
                top="30px"
                :close-on-click-modal='false'
                :show-close='false'
                :append-to-body='true'
                :modal-append-to-body='false'
        >

<!--            发布资讯按钮-->
            <div class="top">
                <el-col>
                    <el-button type="primary" size="small" @click="addNews">发布资讯</el-button>
                </el-col>
            </div>

            <!--            资讯内容显示表格-->
            <div class="news_table">
                <el-table border stripe :data="newsList">
                    <el-table-column label="资讯标题" align="left" prop="newstitle"></el-table-column>
                    <el-table-column label="发布时间" align="center" prop="newsaddtime"></el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope" v-if="scope.row">
                            <el-button size="mini" @click="editOneNews(scope.row.newsid)">查看/更新</el-button>
                            <el-button size="mini" type="danger" @click="deleteOneNews(scope.row.newsid)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="block" v-if="this.total">
                <!--                分页-->

                <!--                v-show="showPagination"   是否显示分页栏-->
                <!--                hide-on-single-page="true"   只有一页时隐藏分页-->
                <!--                @current-change="handleCurrentChange"   点击页面页数时事件-->
                <!--                background   为分页按钮添加背景色-->
                <!--                layout="prev, pager, next, ->, total"   组件布局（向前一页，当前页，向后一页，总记录数）-->
                <!--                :page-size="5"   每页显示个数-->
                <!--                :total="total"   总记录数-->
                <el-pagination
                        v-show="showPagination"
                        hide-on-single-page="true"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        background
                        layout="prev, pager, next, ->, total"
                        :page-size="5"
                        :total="total"
                ></el-pagination>
            </div>

            <!--资讯内容发布、查看、更新Dialog页面-->
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
                                <el-input type="textarea" :rows="2" v-model="newstitle" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="资讯内容" prop="news">
                            <el-col :span="16">
                                <el-input type="textarea" :rows="10" v-model="news" clearable></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button v-if="this.dialog_title==='查看/更新资讯内容'" type="primary" @click="updateNewsInfo">更 新</el-button>
                        <el-button v-if="this.dialog_title==='发布资讯内容'" type="primary" @click="addNewsInfo">发 布</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import AdminHome from "@/pages/AdminHome";
    import axios from "axios";

    export default {
        name: "NewsManage",
        components: {AdminHome},
        data() {
            return {

                // 是否显示Dialog页面，dialogVisible为true
                dialogVisible: true,

                // 当前所处页数
                currentPage:1,

                // 是否显示分页栏
                showPagination:true,

                // 分页页数
                pages:'',

                // 总记录数
                total:'',

                // 资讯内容列表
                newsList:[],

                // 是否打开Dialog页面
                dialogFormVisible: false,

                // Dialog标题
                dialog_title:"查看/更新资讯内容",

                // 表单域标签的位置
                labelPosition:"right",

                // 当前日期时间
                datetime:'',

                // 需要查看、更新或发布的资讯标题
                newstitle:'',

                // 需要查看、更新或发布的资讯内容
                news:'',

                // 需要查看、更新的资讯id，发布时不需要，传参时newsid默认为0，数据库newsid会自增
                newsid :'',

            };
        },

        created() {

            // 获取资讯内容列表
            this.getNewsList();
        },

        methods: {

            // 获取资讯内容列表
            getNewsList(){
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/admin/news_list/' + this.currentPage,
                }).then(res => {
                    this.pages = res.data.pages;
                    this.total = res.data.total;
                    for(let i=0; i<res.data.size; i++){
                        this.newsList.push(res.data.records[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 点击分页栏页数触发事件
            handleCurrentChange(){
                this.newsList = [];
                this.getNewsList();
            },

            // 获取当前的日期时间
            getDatetime(){
                let a = new Date();
                let year = a.getFullYear();
                let month =((a.getMonth()+1)<10?"0":"") + (a.getMonth()+1);
                let date = (a.getDate()<10?"0":"") + a.getDate();
                let hour = (a.getHours()<10?"0":"") + a.getHours();
                let minute = (a.getMinutes()<10?"0":"") + a.getMinutes();
                let second = (a.getSeconds()<10?"0":"") + a.getSeconds();
                this.datetime = year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second
            },

            // Dialog页面取消操作
            cancel(){
                this.$router.go(0);
            },

            // 更改dialog_title为“发布资讯页面”，打开资讯内容发布页面
            addNews() {
                this.dialogFormVisible = true;
                this.dialog_title="发布资讯内容";
            },

            // 提交要发布的资讯内容
            addNewsInfo(){
                this.getDatetime();
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/news/add_news/',
                    data:{
                        "newsid":0,
                        "newstitle":this.newstitle,
                        "newsaddtime":this.datetime,
                        "news":this.news}
                }).then(res => {
                    console.log(res);
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 打开资讯内容查看/更新页面，根据newsid数据回显
            editOneNews(newsid){
                this.dialogFormVisible = true;
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/news/news_info/',
                    params:{"id":newsid}
                }).then(res => {
                    console.log(res);
                    this.newstitle = res.data.newstitle;
                    this.news = res.data.news;
                    this.newsid = res.data.newsid;
                }).catch(error => {
                    console.log(error);
                })
            },

            // 资讯内容查看/更新页面 提交要更新的资讯内容
            updateNewsInfo(){
                this.getDatetime();
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/news/update_news/',
                    params:{
                        "newsid":this.newsid,
                        "newstitle":this.newstitle,
                        "newsaddtime":this.datetime,
                        "news":this.news}
                }).then(res => {
                    console.log(res);
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 删除某个资讯内容
            deleteOneNews(newsid){
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/news/delete_news/',
                    params:{"id":newsid}
                }).then(res => {
                    console.log(res);
                    alert("删除成功");
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

        }
    };
</script>

<style scoped>
    .dialog {
        position: absolute;
        margin-left: 300px;
        margin-top: 80px;
    }

    .news_table{
        margin-top: 70px;
    }

    .block{
        margin-top: 30px;
        margin-left: 400px;
    }

</style>

<style>
    .el-dialog__header{
        padding: 0;
    }

    .el-dialog{
        margin-left: 1px;
    }

</style>