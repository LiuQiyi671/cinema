<template>
    <el-main class="main">
        <el-form :model="loginForm"
                 ref="ReginForm"
                 class="regform"
                 label-width="0">

            <h3>账号密码登录</h3>
            <br>
            <el-form-item prop="username">
                <el-input
                        type="text"
                        v-model="loginForm.username"
                        placeholder="请输入账号">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        type="password"
                        v-model="loginForm.password"
                        placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-button @click="login">登录</el-button>
        </el-form>
    </el-main>
</template>
<script>
    export default {
        name: "AdminLogin",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
            }
        },
        methods: {
            login() {
                if(this.loginForm.username === "admin" && this.loginForm.password === "123456"){
                    window.location.href="http://localhost:8080/admin/home";
                }
                else{
                    alert("管理员账号或密码错误");
                    this.loginForm.username = "";
                    this.loginForm.password = "";
                }

            }
        }
    }

</script>

<style scoped>
    .regform {
        margin: 20px auto;
        width: 310px;
        background: #fff;
        box-shadow: 0 0 10px #B4BCCC;
        padding: 30px 30px 20px 30px;
        border-radius: 25px;
    }

    .main {
        background: url("../assets/img/login_background.jpg");
        background-size: 100% 100%;
        height: 715px;
    }
</style>