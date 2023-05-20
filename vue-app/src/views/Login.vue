<template>
    <div class="login">
        <el-form class="login-form" :model="loginForm" ref="loginForm" :rules="rules">
            <h3 class="title">考勤管理系统-登录</h3>
            <el-form-item prop="account">
                <el-input placeholder="账号" type="text" prefix-icon="el-icon-user-solid" v-model="loginForm.account">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="密码" type="password" prefix-icon="el-icon-lock" v-model="loginForm.password">
                </el-input>
            </el-form-item>
            <el-form-item prop="checkCode">
                <el-input placeholder="验证码" prefix-icon="el-icon-picture-outline-round" v-model="loginForm.checkCode"
                    style="width: 63%" @keyup.enter.native="submit('loginForm')">
                </el-input>
                <div class="login-code">
                    <div @click="getCode" v-html="code" style="vertical-align:middle"></div>
                </div>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberme" style="margin: 0 0 15px 0;"
                @click="() => { this.loginForm.rememberme = !this.loginForm.remembermes }">记住我</el-checkbox>
            <el-form-item>
                <el-button style="width: 100%" @click="submit('loginForm')" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
        <div class="el-login-footer">
            <span>Copyright © 2023 raoxuan All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
// import { getCodeImg } from '@/api/login'
import jwt_decode from 'jwt-decode'
export default {
    data () {
        return {
            loginForm: {
                account: '',
                password: '',
                checkCode: '',
                rememberme: true,
            },
            codeUrl: '',
            code: '',
            codeText: '',
            redirect: undefined,

            rules: {
                account: [
                    { required: true,message: "用户工号不能为空",trigger: "blur" },
                    { min: 2,max: 30,message: "长度在 2 到 30 个字符",trigger: "blur" }
                ],
                password: [
                    { required: true,message: "密码不能为空",trigger: "blur" },
                    { min: 3,max: 30,message: "长度在 6 到 30 个字符",trigger: "blur" }
                ],
                checkCode: [{ required: true,message: "验证码不能为空",trigger: "blur" }]
            }
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                // console.log('gsdrouter', route)
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        }
    },
    beforeMount () {
        // 获取验证码图片
        this.getCode();

        let account = localStorage.getItem('account')
        if (account) {
            this.loginForm.account = account
        }
        let rememberme = localStorage.getItem('rememberme')
        if (rememberme) {
            this.loginForm.rememberme = rememberme
        }
    },
    methods: {
        submit (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.loginForm.checkCode.toLowerCase() == this.codeText.toLowerCase()) {
                        this.$axios.post('/user/login',this.loginForm)
                            .then(res => {
                                const { token } = res.data
                                localStorage.setItem('wmstoken',token)

                                const decode = jwt_decode(token)
                                const userInfo = {
                                    account: decode.account,
                                    name: decode.name,
                                    token
                                }
                                this.$store.commit('setUser',userInfo)

                                if (this.loginForm.rememberme) {
                                    localStorage.setItem('account',this.loginForm.account)
                                    localStorage.setItem('rememberme',this.loginForm.rememberme)
                                }

                                this.$message({
                                    type: "success",
                                    message: '登录成功'
                                })

                                this.$router.push({ path: this.redirect || '/' })
                            })
                            .catch(err => {
                                // this.getCode();
                                // 获取验证码图片
                                console.log(err)
                                this.$message.error('登录失败，请检查用户名及密码是否正确！')
                            })
                    } else { this.$message.error('验证码错误！') }

                } else {
                    this.$message({
                        type: "error",
                        message: '错误提交申请'
                    })
                    return false
                }
            })
            // if (this.loginForm.checkCode.toLowerCase() == this.codeText.toLowerCase()) {
            //   this.$message({
            //     type: "success",
            //     message: '登录成功'
            //   })
            // } else (this.$message({
            //   type: 'error',
            //   message: '验证码错误！'
            // }))
        },
        // 获取验证码
        getCode () {
            this.$axios.get('/user/checkCode')
                .then(res => {
                    console.log(res)
                    this.code = res.data.data
                    this.codeText = res.data.text
                })
        },
    },
}
</script>

<style scoped lang="scss">
.login {
    display: flex;
    height: 100%;
    background: url(../assets/images/login-background.jpg);
    background-size: cover;
    justify-content: center;
    align-items: center;
}

.title {
    text-align: center;
    color: #707070;
    margin: 0 auto 30px;
}

.login-form {
    box-sizing: border-box;
    width: 400px;
    border-radius: 6px;
    background-color: rgba(248, 248, 255, 0.9);
    padding: 25px 25px 5px 25px;
}

.el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
    font-family: Arial;
}

.login-code {
    width: 33%;
    float: right;

    div {
        cursor: pointer;
    }
}

.login-code-imgs {}
</style>
