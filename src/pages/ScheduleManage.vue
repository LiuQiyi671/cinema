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

            <!--            热映影片内容显示表格-->
            <div class="movie_table">
                <el-table border stripe :data="hotmovieList">
                    <el-table-column label="影片名称" align="center" prop="moviename"></el-table-column>
                    <el-table-column label="上映时间" align="center" prop="moviepublicdate"></el-table-column>
                    <el-table-column label="影片题材" align="center" prop="movietype"></el-table-column>
                    <el-table-column label="影片主演" align="center" prop="movieactor"></el-table-column>
                    <el-table-column label="影片时长" align="center" prop="movieduration"></el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template slot-scope="scope" v-if="scope.row">
                            <el-button size="small" @click="addHotMovieSchedule(scope.row.movieid)">添加排片</el-button>
                            <el-button size="mini" @click="showThisMovieAllSchedule(scope.row.movieid)">查看所有
                            </el-button>
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


            <!--查看此影片所有排片Dialog页面-->
            <div>
                <el-dialog
                        width="700px"
                        style="margin-left: 420px;"
                        :title="dialog_title"
                        :visible.sync="dialogFormVisible"
                        :modal-append-to-body="false"
                        v-if="dialogFormVisible"
                        :show-close="false"
                >

                    <!--            添加影片排片按钮-->
                    <!--                    <div class="top">-->
                    <!--                        <el-col>-->
                    <!--                            <el-button type="primary" size="small" @click="addHotMovieSchedule">添加排片</el-button>-->
                    <!--                        </el-col>-->
                    <!--                    </div>-->

                    <!--            所有影片场次显示表格-->
                    <div class="schedule_table">
                        <el-table border stripe :data="scheduleList">
                            <el-table-column label="日期" width="100" align="center" prop=showdate></el-table-column>
                            <el-table-column label="时间" align="center" prop="showtime"></el-table-column>
                            <el-table-column label="影厅" align="center" prop="hallname"></el-table-column>
                            <el-table-column label="票价/元" align="center" prop="price"></el-table-column>
                            <el-table-column label="上座率/%" align="center" prop="percent"></el-table-column>
                            <el-table-column label="总收入/元" align="center" prop="income"></el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope" v-if="scope.row">
                                    <el-button size="mini" type="danger"
                                               @click="deleteOneHotMovieSchedule(scope.row.scheduleid)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                    </div>
                </el-dialog>


            </div>

            <!--添加排片Dialog页面-->
            <div>
                <el-dialog
                        style="margin-left: 500px;"
                        :title="dialog_title1"
                        :visible.sync="dialogFormVisible1"
                        :modal-append-to-body="false"
                        v-if="dialogFormVisible1"
                        :show-close="false"
                >
                    <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="放映影厅" prop="hallname">
                            <el-col :span="16">
                                <el-select style="width:220px" v-model="hallname" placeholder="请选择放映影厅">
                                    <el-option label="1号激光厅" value="1号激光厅"></el-option>
                                    <el-option label="2号激光厅" value="2号激光厅"></el-option>
                                    <el-option label="3号激光厅" value="3号激光厅"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="放映日期" prop="showdate">
                            <el-col :span="16">
                                <el-date-picker
                                        v-model="showdate"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        :picker-options="pickerOptions"
                                        placeholder="请选择影片放映日期">
                                </el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="放映时间" prop="showtime">
                            <el-col :span="16">
                                <el-time-picker
                                        format="HH:mm"
                                        v-model="showtime"
                                        value-format="HH:mm"
                                        placeholder="请选择影片放映时间">
                                </el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item style="width:410px" label="票价" prop="price">
                            <el-col :span="16">
                                <el-input v-model="price" clearable placeholder="请输入单张票价 (元/张)"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="addHotMovieScheduleInfo">添 加</el-button>
                    </div>
                </el-dialog>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import AdminHome from "@/pages/AdminHome";

    export default {
        name: "ScheduleManage",
        components: {AdminHome},
        data() {
            return {
                pickerOptions: {
                    disabledDate(v) {
                        return v.getTime() < new Date().getTime() - 86400000;
                    }
                },

                // 是否显示Dialog页面，dialogVisible为true
                dialogVisible: true,

                // 当前所处页数
                currentPage: 1,

                // 是否显示分页栏
                showPagination: true,

                // 分页页数
                pages: '',

                // 总记录数
                total: '',

                // 热映影片列表
                hotmovieList: [],

                // 是否打开查看排片Dialog页面
                dialogFormVisible: false,

                // 是否打开添加排片Dialog页面
                dialogFormVisible1: false,

                // 查看排片Dialog标题
                dialog_title: "查看本影片所有排片",

                // 添加排片Dialog标题
                dialog_title1: '添加排片',

                // 表单域标签的位置
                labelPosition: "right",

                // 此影片所有排片列表
                scheduleList: [],

                // 需要添加排片的影片id
                movieid: '',

                // 放映影厅
                hallname: '',

                // 放映日期
                showdate: '',

                // 放映时间
                showtime: '',

                // 票价
                price: '',

                // 本场次上座率
                percent: '',

                // 本场次总收入
                income: '',

            };
        },

        created() {

            // 获取热映影片列表
            this.getHotMovieList();
        },

        methods: {

            // 获取热映影片列表
            getHotMovieList() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/admin/movie/hot_movie_list/' + this.currentPage,
                }).then(res => {
                    this.pages = res.data.pages;
                    this.total = res.data.total;
                    for (let i = 0; i < res.data.size; i++) {
                        this.hotmovieList.push(res.data.records[i]);
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 点击分页栏页数触发事件
            handleCurrentChange() {
                this.hotmovieList = [];
                this.getHotMovieList();
            },

            // 打开添加排片页面
            addHotMovieSchedule(movieid) {
                this.movieid = movieid;
                this.dialogFormVisible1 = true;
            },

            // 提交要添加的排片信息
            addHotMovieScheduleInfo() {
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/addschedule',
                    data: {
                        "scheduleid": 0,
                        "movieid": this.movieid,
                        "hallname": this.hallname,
                        "showdate": this.showdate,
                        "showtime": this.showtime,
                        "price": this.price,
                        "seat": ''
                    }
                }).then(res => {
                    alert("添加成功");
                    console.log(res);
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 查看此影片所有排片
            showThisMovieAllSchedule(movieid) {
                this.dialogFormVisible = true;
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/schedule/schedule_list',
                    params: {id: movieid}
                }).then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        this.scheduleList.push(res.data[i]);
                        if(res.data[i].seat.indexOf(",")===-1){
                            this.scheduleList[i].percent = 0;
                            this.scheduleList[i].income = 0;
                        }
                        else{
                            this.scheduleList[i].percent = (res.data[i].seat.split(",").length * 100 / 60).toFixed(2);
                            this.scheduleList[i].income = (res.data[i].seat.split(",").length * res.data[i].price).toFixed(2);
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // Dialog页面取消操作
            cancel() {
                this.$router.go(0);
            },

            // 删除此影片某场次
            deleteOneHotMovieSchedule(scheduleid) {
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/admin/delete_schedule',
                    params: {"id": scheduleid}
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

    .movie_table {
        margin-top: 30px;
    }

    .block {
        margin-top: 30px;
        margin-left: 400px;
    }

    .schedule_table {
        margin-top: 30px;
    }

</style>

<style>
    .el-dialog__header {
        padding: 0;
    }

    .el-dialog {
        margin-left: 1px;
    }

</style>