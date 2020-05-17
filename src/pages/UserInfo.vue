<template>
    <div class="container">

        <!--        导航头header部分-->
        <div class="header">
            <img style="margin-left: 70px; margin-top: 15px" src="../assets/img/logo.png" height="50" width="50">
            <span slot="title" class="title">UPC Online</span>
        </div>

        <h3 style="margin-top: 90px; margin-left: 20px">我的信息</h3>

<!--        个人信息-->
        <div class="user_table">
            <el-table style="width: 70%" border :data="oneUserInfo">
                <el-table-column label="用户名" align="center" min-width="10%" prop="username"></el-table-column>
                <el-table-column label="性别" align="center" min-width="10%" prop="gender"></el-table-column>
                <el-table-column label="手机号码" align="center" min-width="15%" prop="tel"></el-table-column>
                <el-table-column label="电子邮箱" align="center" min-width="25%" prop="email"></el-table-column>
                <el-table-column label="账户余额" align="center" min-width="10%" prop="money"></el-table-column>
                <el-table-column label="操作" min-width="35%" align="center">
                    <template slot-scope="scope" v-if="scope.row">
                        <el-button size="mini" @click="addmoney(50.00)">充值50</el-button>
                        <el-button size="mini" @click="addmoney(100.00)">充值100</el-button>
                        <el-button size="mini" @click="addmoney(200.00)">充值200</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <h3 style="margin-top: 40px; margin-left: 20px">想看影片</h3>


<!--        <div>-->
<!--            <table border="1" cellspacing="0" class="user_table">-->
<!--                <tr><td align="center" valign="middle">用户名</td><td align="center" valign="middle">{{oneUserInfo[0].username}}</td></tr>-->
<!--                <tr><td align="center" valign="middle">性别</td><td align="center" valign="middle">{{oneUserInfo[0].gender}}</td></tr>-->
<!--                <tr><td align="center" valign="middle">手机号码</td><td align="center" valign="middle">{{oneUserInfo[0].tel}}</td></tr>-->
<!--                <tr><td align="center" valign="middle">电子邮箱</td><td align="center" valign="middle">{{oneUserInfo[0].email}}</td></tr>-->
<!--            </table>-->
<!--        </div>-->

        <el-row>
            <el-col :span="4" v-for=" (i , index)  in wishmovieNum " :offset="0" :key="index">
                <el-card class="movie_card">
                    <p>{{wishmovieList[index].moviename}}</p>
                    <img :src="wishmovieUrlList[index]" height="220" width="100%" @click="getMovieDatail(wishmovieList[index].movieid)">
                    <p>电影类型：{{wishmovieList[index].movietype}}</p>
                    <p>电影主演：{{wishmovieList[index].movieactor}}</p>
                    <p>发行时间：{{wishmovieList[index].moviepublicdate}}</p>
                </el-card>
            </el-col>
        </el-row>

        <h3 style="margin-top: 40px; margin-left: 20px">我的电影票</h3>

        <!--            用户影片订单列表显示表格-->
        <div class="orders_table">
            <el-table border stripe :data="userOrderList">
                <el-table-column label="影片名称" align="center" prop="moviename"></el-table-column>
                <el-table-column label="放映日期" align="center" prop="showdate"></el-table-column>
                <el-table-column label="放映时间" align="center" prop="showtime"></el-table-column>
                <el-table-column label="购买票数" align="center" prop="ticketnum"></el-table-column>
                <el-table-column label="放映展厅" align="center" prop="hallname"></el-table-column>
                <el-table-column label="座位号" align="center" prop="orderSeatList"></el-table-column>
                <el-table-column label="取票号码" align="center" prop="phonecode"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <p v-if="(scope.row.showdate < date) || (scope.row.showdate === date && scope.row.showtime < time)" style="font-style: italic;color: red">已放映</p>
                        <el-button v-else size="mini" type="danger" @click="withdrawMoney(scope.row.orderid,scope.row.tickettotalprice)">退款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "UserInfo",
        data() {
            return {
                // 表单域标签的位置
                labelPosition: "right",

                // 被选中要进行编辑的用户的用户信息
                oneUserInfo: [],

                // 用户id
                userid: window.localStorage.getItem("userid"),

                // 用户登录状态
                islogin: window.localStorage.getItem("islogin"),

                // 用户想看影片列表
                wishmovieList:[],

                // 用户想看影片数量
                wishmovieNum:'',

                // 想看影片封面图URL
                wishmovieUrlList:[],

                // 用户影片订单列表
                userOrderList:[],

                // 当前日期
                date:'',

                // 当前时间
                time:'',

                // 退款订单的详细信息
                oneOrderInfo:'',

                // 退款后需要更新的座位列表
                updateSeatInfo:'',

                // 订单座位信息列表，如35->4排6座的形式
                orderSeatList:[],

            };
        },

        created() {

            // 获取用户信息
            this.getUserInfo();

            // 获取用户想看影片列表
            this.getUserWishmovieList();

            // 获取用户订单列表
            this.getUserOrdersList();

            // 获取当前日期
            this.getDate();

            // 获取当前时间
            this.getTime();


        },

        methods: {

            // 获取用户信息
            getUserInfo() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/user_info/',
                    params: {"id": this.userid}
                }).then(res => {
                    // console.log(res.data);
                    this.oneUserInfo.push(res.data);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 获取用户想看影片列表
            getUserWishmovieList(){
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/getwishmovie/',
                    params: {"userid": this.userid}
                }).then(res => {
                    this.wishmovieNum = res.data.length;
                    for(let i=0; i<res.data.length; i++){
                        axios({
                            method: 'get',
                            url: this.$axios.defaults.baseURL + '/user/movie/movie_info',
                            params: {"id": res.data[i]}
                        }).then(res => {
                            let imgurl = "data:image/*;base64," + res.data.file;
                            this.wishmovieUrlList.push(window.URL.createObjectURL(this.dataURLtoBlob(imgurl)));
                            this.wishmovieList.push(res.data);
                            // console.log(res);
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
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

            // 获取用户订单列表
            getUserOrdersList(){
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/order_list/',
                    params: {"userid": this.userid}
                }).then(res => {
                    for(let i=0; i<res.data.length; i++){
                        this.userOrderList.push(res.data[i]);
                        let z ='';
                        for(let j=0 ;j<res.data[i].orderseat.split(",").length; j++){
                            let x = parseInt(res.data[i].orderseat.split(",")[j][0])+1+"排";
                            let y = parseInt(res.data[i].orderseat.split(",")[j][1])+1+"座 ";
                            z = z + x + y;
                            this.userOrderList[i].orderSeatList = z;
                        }
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 获取当前的日期时间
            getDate(){
                let a = new Date();
                let year = a.getFullYear();
                let month =((a.getMonth()+1)<10?"0":"") + (a.getMonth()+1);
                let date = (a.getDate()<10?"0":"") + a.getDate();
                this.date = year+"-"+month+"-"+date
            },

            // 获取当前的日期时间
            getTime(){
                let a = new Date();
                let hour = (a.getHours()<10?"0":"") + a.getHours();
                let minute = (a.getMinutes()<10?"0":"") + a.getMinutes();
                let second = (a.getSeconds()<10?"0":"") + a.getSeconds();
                this.time = hour+":"+minute+":"+second
            },

            // 用户充值
            addmoney(money){
                this.oneUserInfo[0].money = this.oneUserInfo[0].money + money;
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
                    alert("充值成功！")
                    // this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 退款操作
            withdrawMoney(orderid,tickettotalprice){

                for(let i=0; i<this.userOrderList.length; i++){
                    if(this.userOrderList[i].orderid === orderid){
                        this.oneOrderInfo = this.userOrderList[i];
                    }
                }


                if(this.oneOrderInfo.seat[this.oneOrderInfo.seat.indexOf(this.oneOrderInfo.orderseat)-1]===','){
                    this.updateSeatInfo = this.oneOrderInfo.seat.slice(0,this.oneOrderInfo.seat.indexOf(this.oneOrderInfo.orderseat)-1)+this.oneOrderInfo.seat.slice(this.oneOrderInfo.seat.indexOf(this.oneOrderInfo.orderseat)+this.oneOrderInfo.orderseat.length,this.oneOrderInfo.seat.length);
                }
                else {
                    this.updateSeatInfo = this.oneOrderInfo.seat.slice(0,this.oneOrderInfo.seat.indexOf(this.oneOrderInfo.orderseat))+this.oneOrderInfo.seat.slice(this.oneOrderInfo.seat.indexOf(this.oneOrderInfo.orderseat)+this.oneOrderInfo.orderseat.length+1,this.oneOrderInfo.seat.length);
                }

                console.log(this.updateSeatInfo);

                // 本场次的座位需要更新
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/schedule/update_schedule/',
                    params: {
                        "scheduleid": this.oneOrderInfo.scheduleid,
                        "movieid": this.oneOrderInfo.movieid,
                        "hallname": this.oneOrderInfo.hallname,
                        "showdate": this.oneOrderInfo.showdate,
                        "showtime": this.oneOrderInfo.showtime,
                        "price": this.oneOrderInfo.price,
                        "seat": this.updateSeatInfo
                    }
                }).then(res => {
                    this.updateSeatInfo = '';
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })


                // 退款至用户账户余额
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
                        "money":this.oneUserInfo[0].money+ tickettotalprice},
                }).then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })

                // 根据orderid删除订单
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/user/withdraw/',
                    params: {"id": orderid}
                }).then(res => {
                    console.log(res);
                    alert("退款成功，请注意查收！")
                    this.$router.go(0);
                }).catch(error => {
                    console.log(error);
                })
            },

            // 获取影片信息详情
            getMovieDatail(movieid){
                this.$router.push({ name: 'moviedetail', params: { movieid:movieid }});
            },


        },
    }
</script>

<style scoped>

    .container {
        position: relative;
        display: flex;
        flex-direction: column;
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

    .user_table {
        margin-top: 30px;
        margin-left: 320px;
        font-size: 20px;
    }

    .movie_card {
        width: 210px;
        margin-left: 15px;
        margin-bottom: 25px;
        border-radius: 30px;
        overflow: hidden; /*溢出的部分隐藏*/
        white-space: nowrap; /*文本不换行*/
        text-overflow: ellipsis; /*ellipsis:文本溢出显示省略号（...）；clip：不显示省略标记（...），而是简单的裁切*/
    }
</style>