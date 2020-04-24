<template>
    <div>
        <el-form ref="ruleForm" label-width="110px" label-position="left" :model="form" v-loading="loading">
            <el-form-item style="border-right-width:220px" label="影片名称">
                <el-input style="width:220px" v-model="form.moviename"></el-input>
            </el-form-item>
            <el-form-item label="影片类型">
                <el-select v-model="form.movieclassify" placeholder="请选择影片类型">
                    <el-option label="热映影片" value="热映影片"></el-option>
                    <el-option label="即将上映" value="即将上映"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width:330px" label="影片导演">
                <el-input v-model="form.moviedirector"></el-input>
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
            <el-form-item style="width:330px" label="影片时长">
                <el-input v-model="form.movieduration">分钟</el-input>
            </el-form-item>
            <el-form-item label="影片主演">
                <el-input v-model="form.movieactor"></el-input>
            </el-form-item>
            <el-form-item label="影片语言">
                <el-input v-model="form.movielanguage"></el-input>
            </el-form-item>
            <el-form-item label="影片上映时间">
                <el-date-picker
                        v-model="form.movieshowtime"
                        type="date"
                        placeholder="选择影片上映日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="影片简介">
                <el-input v-model="form.moviedescription"></el-input>
            </el-form-item>


            <el-form-item label="电影封面图片">
                <el-upload
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
                    <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过4MB</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AdminAddMovie",
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
                    moviedescription: "",
                    file: "",
                    movieid: null,
                },
                loading: false,
                uploadDisabled: false,
            };
        },
        methods: {
            handleChange(file, fileList) {
                if (file.size > 1024 * 1024 * 4) {
                    this.$refs.upload.clearFiles();
                    this.uploadDisabled = false;
                    this.$message({
                        message: "上传图片大小不能超过 4MB!",
                        type: "error"
                    });
                } else {
                    this.uploadDisabled = fileList.length >= 1;
                    this.form.file = file.raw; //将上传文件付给表单的字段
                }
            },
            handleRemove(file, fileList) {
                console.log("handleRemove", file);
                this.uploadDisabled = fileList.length >= 1;
            },
            onSubmit() {
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        let formData = new FormData();
                        for (let key in this.form) {
                            formData.append(key, this.form[key]);
                            formData.append("moviewishpeoplenum",0);
                        }

                        this.$axios({
                            method: "post",
                            url:this.$axios.defaults.baseURL+"/admin/movie/add_movie",
                            headers: {
                                "Content-Type": "multipart/form-data"
                            },
                            data: formData
                        }).then((res) => {
                            console.log(res);
                        });
                        this.loading = false;
                    } else {
                        return false;
                    }
                });
            },
            reset() {
                this.$refs.upload.clearFiles();
                this.uploadDisabled = false;
                this.$refs.ruleForm.resetFields();
            }
        },
    }
</script>

<style>
    .disabled .el-upload--picture-card {
        display: none;
    }
</style>