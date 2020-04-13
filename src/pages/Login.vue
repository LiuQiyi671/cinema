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
            <el-button @click="register">注册</el-button>
        </el-form>
    </el-main>
</template>
<script>
    import axios from 'axios'

    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                responseResult: []
            }
        },
        methods: {
            login() {
                axios({
                    method: 'post',
                    url: this.$axios.defaults.baseURL+'/user/login',
                    data: {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    },
                }).then(res => {
                    console.log(res);
                    if (res.data === true) {
                        this.$router.push('/home');
                    }
                    else {
                        alert("账号密码错误，请重新输入");
                        this.loginForm.username = '';
                        this.loginForm.password = '';
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            register() {
                this.$router.push('/user/register');
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