<template>
    <div>
        <div>
            <AdminHome></AdminHome>
        </div>
        <el-dialog
                class="dialog"
                :visible.sync="dialogVisible"
                :modal="false"
                top="96px"
                :close-on-click-modal="false"
                :show-close="false"
                :append-to-body="true">
            <div class="top">
                <el-col :span="12">
                    <el-input placeholder="请输入用户名" v-model="input" class="input-with-select" clearable
                              style="width: 100%">
                        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
                    </el-input>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" size="small" @click="addUser">添加用户</el-button>
                </el-col>
            </div>
<!--            表格-->
            <div class="user-table">
                <el-table border :data="userList">
                    <el-table-column label="用户id" align="center" width="100" prop="userid"></el-table-column>
                    <el-table-column label="用户名" align="center" width="120" prop="username"></el-table-column>
                    <el-table-column label="性别" align="center" width="60" prop="gender"></el-table-column>
                    <el-table-column label="手机号码" align="center" width="120" prop="tel"></el-table-column>
                    <el-table-column label="电子邮箱" align="center" width="120" prop="email"></el-table-column>
                    <el-table-column label="操作" align="center" width="200" >
                        <template>
                            <el-button size="mini" @click="editOneUser">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteOneUser">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
<!--            分页-->
            <div class="block" v-if="this.total">
                <el-pagination
                        @current-change="currentPage"
                        background
                        layout="prev, pager, next"
                        :page-size="5"
                        :total="total"
                ></el-pagination>
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
                input: '',
                dialogVisible: true,
                currentPage:1,
                pages:'',
                total:'',
                userList:[],
            };
        },
        created() {
            this.getUserList();
        },
        methods: {
            getUserList(){
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/admin/user_list/' + this.currentPage,
                }).then(res => {
                    this.pages = res.data.pages;
                    this.total = res.data.total;
                    for(let i=0; i<res.data.size; i++){
                        this.userList.push(res.data.records[i]);
                    }
                    console.log(this.userList);
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    };
</script>

<style scoped>
    .dialog {

    }
</style>style>