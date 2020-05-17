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

            <!--            搜索框-->
            <div class="top">
                <el-col :span="12">
                    <el-input placeholder="请输入用户手机号码" v-model="input" clearable style="width: 60%">
                        <el-button slot="append" icon="el-icon-search" @click="searchOneUser">搜索</el-button>
                    </el-input>
                </el-col>

<!--                查找完某个用户的用户信息，点击按钮回到上一个页面-->
                <el-col :span="2" :offset="10">
                    <el-button v-show="!showPagination" type="primary" size="small" @click="$router.go(0)">好的</el-button>
                </el-col>
            </div>

            <!--            用户信息显示表格-->
            <div class="user_table">
                <el-table border stripe :data="userList">
                    <el-table-column label="用户名" align="center" prop="username"></el-table-column>
                    <el-table-column label="性别" align="center" prop="gender"></el-table-column>
                    <el-table-column label="手机号码" align="center" prop="tel"></el-table-column>
                    <el-table-column label="电子邮箱" align="center" prop="email"></el-table-column>
                    <el-table-column label="账户余额" align="center" prop="money"></el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope" v-if="scope.row">
                            <el-button size="mini" @click="editOneUser(scope.row.userid)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteOneUser(scope.row.userid)">删除</el-button>
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

            <!--用户信息编辑Dialog-->
            <div>
                <el-dialog
                        style="margin-left: 500px;"
                        title="编辑用户信息"
                        :visible.sync="dialogFormVisible"
                        :modal-append-to-body="false"
                        v-if="dialogFormVisible"
                        :show-close="false"
                >
                    <el-form :label-position="labelPosition" label-width="80px" :model="oneUserInfo">
                        <el-form-item label="用户名" prop="username">
                            <el-col :span="16">
                                <el-input v-model="oneUserInfo[0].username" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="tel">
                            <el-col :span="16">
                                <el-input v-model="oneUserInfo[0].tel" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="电子邮箱" prop="email">
                            <el-col :span="16">
                                <el-input v-model="oneUserInfo[0].email" clearable></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-col :span="16">
                                <el-select v-model="oneUserInfo[0].gender" placeholder="请选择性别" style="width: 100%">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="manageUserInfo">确 定</el-button>
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
        name: "UserManage",
        components: {AdminHome},
        data() {
            return {

                // 输入框input
                input: '',

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

                // 用户信息列表
                userList:[],

                // 是否显示编辑用户信息Dialog
                dialogFormVisible: false,

                // 被选中要进行编辑的用户的用户信息
                oneUserInfo:[],

                // 表单域标签的位置
                labelPosition:"right",
            };
        },

        created() {

            // 获取用户信息列表
            this.getUserList();
        },

        methods: {

            // 获取用户信息列表
            getUserList(){
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/admin/user_list/' + this.currentPage,
                }).then(res => {
                    this.pages = res.data.pages;
                    this.total = res.data.total;
                    for(let i=0; i<res.data.size; i++){
                        console.log(res.data.records[i]);
                        this.userList.push(res.data.records[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 点击分页栏页数触发事件
            handleCurrentChange(){
                this.userList = [];
                this.getUserList();
            },

            // 根据用户手机号码查找某个用户的用户信息
            searchOneUser(){
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/admin/get_one_user/',
                    params:{"tel":this.input}
                }).then(res => {
                    this.userList = [];
                    this.userList.push(res.data);
                    this.showPagination = false;
                }).catch(error => {
                    console.log(error);
                })
            },

            // 更新某个用户的用户信息
            editOneUser(userid){
                this.dialogFormVisible = true;
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/user_info/',
                    params:{"id":userid}
                }).then(res => {
                    console.log(res);
                    this.oneUserInfo.push(res.data);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 用户信息编辑页面取消操作
            cancel(){
                this.$router.go(0);
            },

            // 用户信息编辑页面提交用户信息更新数据
            manageUserInfo(){
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/user/update/',
                    params:{
                        "userid":this.oneUserInfo[0].userid,
                        "username":this.oneUserInfo[0].username,
                        "password":this.oneUserInfo[0].password,
                        "tel":this.oneUserInfo[0].tel,
                        "email":this.oneUserInfo[0].email,
                        "gender":this.oneUserInfo[0].gender,
                        "money":this.oneUserInfo[0].money},
                }).then(res => {
                    console.log(res);
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 删除某个用户的用户信息
            deleteOneUser(userid){
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/delete_user/',
                    params:{"id":userid}
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

    .user_table{
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