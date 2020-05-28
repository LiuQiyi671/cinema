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

            <!--            添加即将上映影片按钮-->
            <div class="top">
                <el-col>
                    <el-button type="primary" size="small" @click="addHotMovie">影片上架</el-button>
                </el-col>
            </div>

            <!--            即将上映影片内容显示表格-->
            <div class="movie_table">
                <el-table border stripe :data="upcomingmovieList">
                    <el-table-column label="影片名称" align="center" prop="moviename"></el-table-column>
                    <el-table-column label="上映时间" align="center" prop="moviepublicdate"></el-table-column>
                    <el-table-column label="影片题材" align="center" prop="movietype"></el-table-column>
                    <el-table-column label="影片主演" align="center" prop="movieactor"></el-table-column>
                    <el-table-column label="影片时长" align="center" prop="movieduration"></el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope" v-if="scope.row">
                            <el-button size="mini" @click="editOneUpcomingMovie(scope.row.movieid)">查看/更新</el-button>
                            <el-button size="mini" type="danger" @click="deleteOneUpcomingMovie(scope.row.movieid)">下架</el-button>
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
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import AdminHome from "@/pages/AdminHome";

    export default {
        name: "UpcomingMovieManage",
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

                // 即将上映影片列表
                upcomingmovieList:[],

                // 是否打开Dialog页面
                dialogFormVisible: false,




            };
        },

        created() {

            // 获取即将上映影片列表
            this.getUpcomingMovieList();
        },

        methods: {

            // 获取即将上映影片列表
            getUpcomingMovieList(){
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/admin/movie/upcoming_movie_list/' + this.currentPage,
                }).then(res => {
                    this.pages = res.data.pages;
                    this.total = res.data.total;
                    for(let i=0; i<res.data.size; i++){
                        this.upcomingmovieList.push(res.data.records[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 点击分页栏页数触发事件
            handleCurrentChange(){
                this.upcomingmovieList = [];
                this.getUpcomingMovieList();
            },

            // 跳转到影片添加页面
            addHotMovie(){
                this.$router.push("/admin/addmovie");
            },

            // 跳转到即将上映影片查看/更新页面，根据movieid数据回显
            editOneUpcomingMovie(movieid){
                this.$router.push({ name: 'AdminEditMovie', params: { movieid: movieid}});
            },

            // 删除某个即将上映影片
            deleteOneUpcomingMovie(movieid){
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/movie/delete_movie/',
                    params:{"id":movieid}
                }).then(res => {
                    console.log(res);
                    alert("删除成功");
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

        }
    }
</script>

<style scoped>
    .dialog {
        position: absolute;
        margin-left: 300px;
        margin-top: 80px;
    }

    .movie_table{
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