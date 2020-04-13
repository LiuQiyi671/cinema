<template>
    <div class="main">
        <el-main ref="homepage">
            <el-form
                    :model="ReginForm"
                    ref="ReginForm"
                    :rules="rule"
                    class="regform"
                    label-width="0">

                <h3>用户注册</h3>
                <br>
                <el-form-item prop="username">
                    <el-input
                            type="text"
                            v-model="ReginForm.username"
                            placeholder="用户名">
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input
                            type="password"
                            v-model="ReginForm.password"
                            placeholder="密码">
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirmpassword">
                    <el-input
                            type="password"
                            v-model="ReginForm.confirmpassword"
                            placeholder="确认密码">
                    </el-input>
                </el-form-item>

                <el-form-item prop="tel">
                    <el-input
                            type="text"
                            v-model="ReginForm.tel"
                            placeholder="手机号码">
                    </el-input>
                </el-form-item>

                <el-form-item prop="email">
                    <el-input
                            type="email"
                            v-model="ReginForm.email"
                            placeholder="电子邮箱">
                    </el-input>
                </el-form-item>

                <el-form-item prop="sex">
                    <el-select v-model="ReginForm.gender"  placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item >
                    <el-button
                            type="success"
                            class="submitBtn"
                            round
                            @click="submit">
                        注册
                    </el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: "Register",
        data () {
            let confirmpasswordCheck = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('密码是必须的'))
                } else if (value !== this.ReginForm.password) {
                    return callback(new Error('两次输入的密码不一致'))
                } else {
                    return callback()
                }
            };

            let telCheck = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error('手机号码是必须的'))
                } else if (Number.isInteger(value)) {
                    return callback(new Error('手机号码必须是数字'))
                } else if (value.toString().length !== 11) {
                    return callback(new Error('手机号码必须是11位数字'))
                } else {
                    callback()
                }
            };

            return {
                ReginForm: {
                    userid:null,
                    username: '',
                    password: '',
                    confirmpassword: '',
                    tel: '',
                    email: '',
                    gender: ''
                },
                logining: false,
                rule: {
                    username: [
                        {
                            required: true,
                            max: 16,
                            min: 8,
                            message: '用户名是必须的',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码是必须的，长度为8-16位',
                            trigger: 'blur'
                        }
                    ],
                    confirmpassword: [
                        {
                            required: true,
                            validator: confirmpasswordCheck,
                            message: '请确认您的密码',
                            trigger: 'blur'
                        }
                    ],
                    tel: [
                        {
                            required: true,
                            validator: telCheck,
                            trigger: 'blur'
                        }
                    ],
                    email: [
                        {
                            required: true,
                            type: 'email',
                            message: '请输入正确的电子邮件格式(xxx@xxx.com)',
                            trigger: 'blur'
                        }
                    ],
                    gender: [
                        {
                            required: true,
                            message: '性别是必须的',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            submit () {
                this.$refs.ReginForm.validate(valid => {
                    if (valid) {
                        axios({
                            method: 'post',
                            url: this.$axios.defaults.baseURL+'/user/register',
                            async:false,
                            data:{
                                username:this.ReginForm.username,
                                password:this.ReginForm.password,
                                tel:this.ReginForm.tel,
                                email:this.ReginForm.email,
                                gender:this.ReginForm.gender},
                        }).then(res => {
                            console.log(res);
                            this.$router.push("/user/login");
                        }).catch(error => {
                            console.log(error);
                        })
                    } else {
                        console.log('submit err')
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .regform {
        margin: 20px auto;
        width: 310px;
        background: #fff;
        box-shadow: 0 0 10px #B4BCCC;
        padding: 30px 30px 10px 30px;
        border-radius: 25px;
    }
    .submitBtn {
        width: 100%;
    }
    .main{
        background:url("../assets/img/register_background.jpg");
        background-size:100% 100%;
        height: 715px;
    }
</style>