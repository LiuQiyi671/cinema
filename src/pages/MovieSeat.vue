<template>
    <div class="container">

        <!--        导航头header部分-->
        <div class="header">
            <img style="margin-left: 70px; margin-top: 15px" src="../assets/img/logo.png" height="50" width="50">
            <span slot="title" class="title">UPC Online</span>
        </div>

        <p style="font-size: 20px; margin-top: 120px; margin-left: 23%">{{scheduleInfo.hallname}}银幕</p>

        <!--            座位示例-->
        <div class="seat-example">
            <div class="example"><img src="../assets/img/empty-seat.png">可选</div>
            <div class="example"><img src="../assets/img/sold-seat.png">不可选</div>
            <div class="example"><img src="../assets/img/selected-seat.png">已选</div>
        </div>

        <!--        座位表-->
        <div class="seat-block">
            <div class="seat-container">
                <div class="row" v-for="(itemI,indexI) in seatIJ" :key="indexI">
          <span class="seat" v-for="(itemJ,indexJ) in itemI" :key="indexJ">
                <img v-if="itemJ===0" src="../assets/img/empty-seat.png"
                     @click.prevent="handleSelectSeat(indexI,indexJ)">
                <img v-if="itemJ===1" src="../assets/img/sold-seat.png"
                     @click.prevent="handleSelectSeat(indexI,indexJ)">
                <img v-if="itemJ===2" src="../assets/img/selected-seat.png"
                     @click.prevent="handleSelectSeat(indexI,indexJ)">
          </span>
                </div>
            </div>
        </div>

        <!--        下单购票信息-->
        <h3 style="font-size: 20px; color: red; margin-left: 60%">{{this.$route.params.moviename}}</h3>
        <h3 style="font-size: 20px; margin-left: 60%">影厅：{{scheduleInfo.hallname}}</h3>
        <h3 style="font-size: 20px; margin-left: 60%">
            场次：{{scheduleInfo.showdate}}&nbsp;&nbsp;{{scheduleInfo.showtime}}</h3>
        <h3 style="font-size: 20px; margin-left: 60%">票价：{{scheduleInfo.price}}元</h3>
        <h3 style="font-size: 20px; margin-left: 60%">选座：</h3>
        <el-row style="margin-left:63%">
            <el-col :span="3" v-for=" (i , index)  in showSelectedSeat.length " :offset="1" :key="index">
                <el-button type="primary">{{showSelectedSeat[index]}}</el-button>
            </el-col>
        </el-row>
        <h3 style="font-size: 20px; margin-left: 60%">总价：{{scheduleInfo.price*seatCount}}元</h3>

        <el-button style="width: 80px; margin-top:20px; margin-left: 60%" type="primary" @click="buy">支付</el-button>


    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "MovieSeat",
        data() {
            return {

                // 用户id
                userid: window.localStorage.getItem("userid"),

                // 场次信息
                scheduleInfo: '',

                // 用户选座座位数
                seatCount: 0,

                selectedSeat: false,

                // 用户选座的座位列表
                selectedSeatInfo: [],

                // 将[1,4]转化为2排5座的样式的列表
                showSelectedSeat: [],

                // 本场次座次表
                seatIJ: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],

                // 购票下单成功后的本场次的座位列表
                updateSeatInfo: [],

                // 购票座位列表
                orderSeatInfo: [],

                // 购票下单手机号码
                ordertel: '',

                // 随机生成的六位数取票码
                phonecode: '',

            }
        },
        created() {

            // 根据排片id获取本场次所有信息
            this.getScheduleInfo();

            // 随机生成六位数取票码
            this.phonecode = this.getPhoneCode();

            // 获取用户购票下单手机号码
            this.getUserInfo();

        },
        methods: {

            // 根据排片id获取本场次所有信息
            getScheduleInfo() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/schedule/schedule_info',
                    params: {scheduleid: this.$route.params.scheduleid}
                }).then(res => {
                    this.scheduleInfo = res.data;
                    this.updateSeatInfo = res.data.seat;
                    for (let i = 0; i < res.data.seat.split(',').length; i++) {
                        let x = res.data.seat.split(',')[i][0];
                        let y = res.data.seat.split(',')[i][1];
                        this.seatIJ[x][y] = 1;
                    }
                }).catch(error => {
                    console.log(error);
                })
            },

            // 获取用户信息
            getUserInfo() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/user/user_info/',
                    params: {"id": this.userid}
                }).then(res => {
                    this.ordertel = res.data.tel;
                }).catch(error => {
                    console.log(error);
                })
            },

            //选择座位
            handleSelectSeat(indexI, indexJ) {
                if (this.seatCount === 4 && this.seatIJ[indexI][indexJ] === 0) {
                    alert('一次最多选择4个座位哦！');
                } else {
                    if (this.seatIJ[indexI][indexJ] === 0) {
                        this.seatIJ[indexI][indexJ] = 2;
                        this.selectedSeatInfo.push([indexI, indexJ]);
                        this.showSelectedSeat.push(indexI + 1 + '排' + (indexJ + 1) + '座');
                        this.seatCount += 1;
                        if (!this.selectedSeat) {
                            this.selectedSeat = true;
                        }
                    } else if (this.seatIJ[indexI][indexJ] === 2) {
                        this.seatIJ[indexI][indexJ] = 0;
                        this.seatCount -= 1;
                        let currentIndex;
                        this.selectedSeatInfo.forEach((value, index) => {
                            if (indexI === value[0] && indexJ === value[1]) {
                                currentIndex = index;
                            }
                        });
                        this.selectedSeatInfo.splice(currentIndex, 1);
                        this.showSelectedSeat.splice(currentIndex, 1);
                        if (this.seatCount === 0) {
                            this.selectedSeat = false;
                        }
                    }
                }
            },

            // 获取当前的日期时间
            getDate() {
                let a = new Date();
                let year = a.getFullYear();
                let month = ((a.getMonth() + 1) < 10 ? "0" : "") + (a.getMonth() + 1);
                let date = (a.getDate() < 10 ? "0" : "") + a.getDate();
                return year + "-" + month + "-" + date;
            },

            // 随机生成六位数取票码
            getPhoneCode() {
                let code = "";
                for (let i = 0; i < 6; i++) {
                    let radom = Math.floor(Math.random() * 10);
                    code += radom;
                }
                return code;
            },

            // 下单支付
            buy() {
                for (let i = 0; i < this.selectedSeatInfo.length; i++) {
                    if (i === this.selectedSeatInfo.length - 1) {
                        this.orderSeatInfo = this.orderSeatInfo + this.selectedSeatInfo[i][0] + this.selectedSeatInfo[i][1];
                    } else {
                        this.orderSeatInfo = this.orderSeatInfo + this.selectedSeatInfo[i][0] + this.selectedSeatInfo[i][1] + ',';
                    }
                }

                this.updateSeatInfo = this.updateSeatInfo + ',' + this.orderSeatInfo;

                // 本场次的座位需要更新
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/schedule/update_schedule/',
                    params: {
                        "scheduleid": this.$route.params.scheduleid,
                        "movieid": this.scheduleInfo.movieid,
                        "hallname": this.scheduleInfo.hallname,
                        "showdate": this.scheduleInfo.showdate,
                        "showtime": this.scheduleInfo.showtime,
                        "price": this.scheduleInfo.price,
                        "seat": this.updateSeatInfo
                    }
                }).then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })

                // 购票下单
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL + '/user/addorder/',
                    data: {
                        "orderid": 0,
                        "userid": this.userid,
                        "scheduleid": this.$route.params.scheduleid,
                        "tel": this.ordertel,
                        "orderdate": this.getDate(),
                        "ticketnum": this.seatCount,
                        "tickettotalprice": this.scheduleInfo.price * this.seatCount,
                        "orderseat": this.orderSeatInfo,
                        "phonecode": this.phonecode
                    }
                }).then(res => {
                    console.log(res);
                    alert("买票成功，您的取票码是：" + this.phonecode);
                    this.$router.push("/home");
                }).catch(error => {
                    console.log(error);
                })
            },


        },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

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

    .seat-example {
        position: absolute
        margin-top: 200px
        width: 80%
        margin-left: 20%
        display: flex
        align-items: center
    }

    .example {
        font-size: 16px
        color: #888
        margin-right: 5px
        display: flex
        align-items: center
    }

    .row {
        margin-bottom: 10px
    }

    .seat-container {
        position: absolute
        margin-top: 100px
        margin-left: 200px
    }

    .seat {
        margin-left: 10px
    }


</style>