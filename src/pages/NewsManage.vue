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

<!--            发布资讯-->
            <div class="top">
                <el-col>
                    <el-button type="primary" size="small" @click="addNews">发布资讯</el-button>
                    <p>{{datetime}}</p>
                </el-col>
            </div>

            <!--            资讯内容显示表格-->
            <div class="news_table">
                <el-table border stripe :data="newsList">
                    <el-table-column label="资讯标题" align="center" prop="newstitle"></el-table-column>
                    <el-table-column label="资讯内容" align="left" prop="news"></el-table-column>
                    <el-table-column label="发布时间" align="center" prop="newsaddtime"></el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope" v-if="scope.row">
                            <el-button size="mini" @click="editOneNews(scope.row.newsid)">编辑</el-button>
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

            <!--资讯内容编辑Dialog-->
            <div>
                <el-dialog
                        style="margin-left: 500px;"
                        title="编辑资讯内容"
                        :visible.sync="dialogFormVisible"
                        :modal-append-to-body="false"
                        v-if="dialogFormVisible"
                        :show-close="false"
                >
                    <el-form :label-position="labelPosition" label-width="80px" :model="oneNewsInfo">
                        <el-form-item label="资讯标题" prop="newstitle">
                            <el-col :span="16">
                                <el-input v-model="oneNewsInfo[0].newstitle" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="资讯内容" prop="news">
                            <el-col :span="16">
                                <el-input v-model="oneNewsInfo[0].news" clearable></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="manageNewsInfo">确 定</el-button>
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

                // 是否显示 Dialog，dialogVisible为true
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

                // 是否显示编辑资讯内容Dialog
                dialogFormVisible: false,

                // 被选中要进行编辑的资讯的内容信息
                oneNewsInfo:[],

                // 表单域标签的位置
                labelPosition:"right",

                // 当前日期时间
                datetime:'',
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

            // 发布资讯
            addNews() {

            },

            // 更新某个资讯的资讯内容
            editOneNews(newsid){
                this.dialogFormVisible = true;
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/news/news_info/',
                    params:{"id":newsid}
                }).then(res => {
                    console.log(res);
                    this.oneNewsInfo.push(res.data);
                }).catch(error => {
                    console.log(error);
                })
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

            // 资讯内容编辑页面取消操作
            cancel(){
                this.$router.go(0);
            },

            // 资讯内容编辑页面提交资讯内容更新数据
            manageNewsInfo(){
                this.getDatetime();
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/news/update_news/',
                    params:{
                        "newsid":this.oneNewsInfo[0].newsid,
                        "newstitle":this.oneNewsInfo[0].newstitle,
                        "newsaddtime":this.datetime,
                        "news":this.oneNewsInfo[0].news}
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