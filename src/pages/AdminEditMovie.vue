<template>
    <div class="container">

        <!--        导航头header部分-->
        <div class="header">
            <img style="margin-left: 70px; margin-top: 15px" src="../assets/img/logo.png" height="50" width="50">
            <span slot="title" class="title">UPC Online</span>
        </div>

        <!--        影片添加标题-->
        <h3 style="margin-top: 90px; margin-left: 20px">查看/更新影片</h3>

        <!--        影片添加表格-->
        <el-form style="margin-top: 10px; margin-left: 450px" label-width="110px" label-position="left" :model="form">
            <el-form-item label="影片名称">
                <el-input style="width:220px" v-model="form.moviename" clearable></el-input>
            </el-form-item>

            <el-form-item label="影片类型">
                <el-select style="width:220px" v-model="form.movieclassify" placeholder="请选择影片类型">
                    <el-option label="热映影片" value="热映影片"></el-option>
                    <el-option label="即将上映" value="即将上映"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="影片导演">
                <el-input style="width:220px" v-model="form.moviedirector" clearable></el-input>
            </el-form-item>

            <el-form-item label="影片题材">
                <el-radio-group style="width:540px" v-model="form.movietype">
                    <el-radio-button label="爱情" value="爱情"></el-radio-button>
                    <el-radio-button label="喜剧" value="喜剧"></el-radio-button>
                    <el-radio-button label="动画" value="动画"></el-radio-button>
                    <el-radio-button label="剧情" value="剧情"></el-radio-button>
                    <el-radio-button label="恐怖" value="恐怖"></el-radio-button>
                    <el-radio-button label="惊悚" value="惊悚"></el-radio-button>
                    <el-radio-button label="科幻" value="科幻"></el-radio-button>
                    <el-radio-button label="动作" value="动作"></el-radio-button>
                    <el-radio-button label="悬疑" value="悬疑"></el-radio-button>
                    <el-radio-button label="犯罪" value="犯罪"></el-radio-button>
                    <el-radio-button label="冒险" value="冒险"></el-radio-button>
                    <el-radio-button label="战争" value="战争"></el-radio-button>
                    <el-radio-button label="奇幻" value="奇幻"></el-radio-button>
                    <el-radio-button label="运动" value="运动"></el-radio-button>
                    <el-radio-button label="家庭" value="家庭"></el-radio-button>
                    <el-radio-button label="古装" value="古装"></el-radio-button>
                    <el-radio-button label="武侠" value="武侠"></el-radio-button>
                    <el-radio-button label="西部" value="西部"></el-radio-button>
                    <el-radio-button label="历史" value="历史"></el-radio-button>
                    <el-radio-button label="传记" value="传记"></el-radio-button>
                    <el-radio-button label="歌舞" value="歌舞"></el-radio-button>
                    <el-radio-button label="黑色电影" value="黑色电影"></el-radio-button>
                    <el-radio-button label="短片" value="短片"></el-radio-button>
                    <el-radio-button label="纪录片" value="纪录片"></el-radio-button>
                    <el-radio-button label="其他" value="其他"></el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="影片发行地区">
                <el-radio-group style="width:600px" v-model="form.moviecountry">
                    <el-radio-button label="大陆" value="大陆"></el-radio-button>
                    <el-radio-button label="美国" value="美国"></el-radio-button>
                    <el-radio-button label="韩国" value="韩国"></el-radio-button>
                    <el-radio-button label="日本" value="日本"></el-radio-button>
                    <el-radio-button label="中国香港" value="中国香港"></el-radio-button>
                    <el-radio-button label="中国台湾" value="中国台湾"></el-radio-button>
                    <el-radio-button label="澳大利亚" value="澳大利亚"></el-radio-button>
                    <el-radio-button label="泰国" value="泰国"></el-radio-button>
                    <el-radio-button label="印度" value="印度"></el-radio-button>
                    <el-radio-button label="法国" value="法国"></el-radio-button>
                    <el-radio-button label="英国" value="英国"></el-radio-button>
                    <el-radio-button label="德国" value="德国"></el-radio-button>
                    <el-radio-button label="波兰" value="波兰"></el-radio-button>
                    <el-radio-button label="伊朗" value="伊朗"></el-radio-button>
                    <el-radio-button label="俄罗斯" value="俄罗斯"></el-radio-button>
                    <el-radio-button label="意大利" value="意大利"></el-radio-button>
                    <el-radio-button label="西班牙" value="西班牙"></el-radio-button>
                    <el-radio-button label="其他" value="其他"></el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="影片时长">
                <el-input style="width:220px" v-model="form.movieduration" placeholder="请输入分钟数"></el-input>
            </el-form-item>

            <el-form-item label="影片主演">
                <el-input style="width:220px" v-model="form.movieactor" clearable></el-input>
            </el-form-item>

            <el-form-item label="影片语言">
                <el-input style="width:220px" v-model="form.movielanguage" clearable></el-input>
            </el-form-item>

            <el-form-item label="影片上映时间">
                <el-date-picker
                        v-model="form.moviepublicdate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择影片上映日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="影片简介">
                <el-input style="width:550px" type="textarea" :rows="10" v-model="form.moviedescription"
                          clearable></el-input>
            </el-form-item>

            <el-form-item label="原电影封面图片">
                <img :src="movieUrl" height="148" width="148">
            </el-form-item>

            <el-form-item label="重新上传封面图">
                <el-upload
                        name="file"
                        action="http://localhost:8088/api/admin/movie/add_movie"
                        ref="upload"
                        :class="{ disabled: uploadDisabled }"
                        list-type="picture-card"
                        :limit="1"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :auto-upload="false"
                        accept="image/*"
                        :data="form"
                >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过2MB</div>
                </el-upload>
            </el-form-item>

            <el-form-item>
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="onSubmit">更新影片</el-button>
                <el-button @click="reset">清除图片</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "AdminEditMovie",
        data() {
            return {

                form: {
                    moviename: "",
                    movieclassify: "",
                    moviedirector: "",
                    movietype: "",
                    moviecountry: "",
                    movieduration: "",
                    movieactor: "",
                    movielanguage: "",
                    moviepublicdate: "",
                    file: "",
                    moviedescription: "",
                    movieid: '',
                    moviewishpeoplenum: '',
                },

                // 封面图URL
                movieUrl: '',

                // 添加图片后是否立即上传，值为false，等待其他属性完整之后一起以formdata形式上传
                uploadDisabled: false,
            };
        },

        created() {

            // 根据movieid数据回显
            this.editOneHotMovie();

        },

        methods: {

            // 根据movieid数据回显
            editOneHotMovie() {
                axios({
                    method: 'get',
                    url: this.$axios.defaults.baseURL + '/admin/movie/movie_info/',
                    params: {"id": this.$route.params.movieid}
                }).then(res => {
                    let imgurl = "data:image/*;base64," + res.data.file;
                    this.movieUrl = window.URL.createObjectURL(this.dataURLtoBlob(imgurl));
                    this.form = res.data;
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

            // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
            handleChange(file, fileList) {
                if (file.size > 1024 * 1024 * 4) {
                    this.$refs.upload.clearFiles();
                    this.uploadDisabled = false;
                    this.$message({
                        message: "上传图片大小不能超过 2MB!",
                        type: "error"
                    });
                } else {
                    this.uploadDisabled = fileList.length >= 1;
                    this.form.file = file.raw; //将上传文件付给表单的字段
                }
            },

            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) {
                console.log("handleRemove", file);
                this.uploadDisabled = fileList.length >= 1;
            },

            // 取消操作
            cancel() {
                this.$router.go(-1);
            },

            // 以formdata格式提交form表单
            onSubmit() {

                let formData = new FormData();
                for (let key in this.form) {
                    formData.append(key, this.form[key]);
                }

                axios({
                    method: "post",
                    url: this.$axios.defaults.baseURL + "/admin/movie/update_movie",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    data: formData
                }).then((res) => {
                    alert("影片信息已成功修改");
                    this.$router.push("/admin/home");
                    console.log(res);
                }).catch(error => {
                    alert("图片过大，请更换图片");
                    console.log(error);
                });
            },

            // 清除图片
            reset() {
                this.$refs.upload.clearFiles();
                this.uploadDisabled = false;
                this.$refs.ruleForm.resetFields();
            }


        }
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

    .disabled .el-upload--picture-card {
        display: none;
    }

</style>