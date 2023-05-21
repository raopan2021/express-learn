<template>
    <div>
        <div class="search" style="margin-bottom: 5px">
            <el-input placeholder="请输入姓名" style="width: 200px" suffix-icon="el-icon-search" v-model="searchUserName"
                @keyup.enter.native="handleSearch" clearable></el-input>
            <el-select v-model="searchUserLevel" placeholder="请选择职级" clearable style="margin-left: 5px; width: 200px">
                <el-option v-for="item in levelOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 5px" size="small" @click="handleSearch">搜索</el-button>
            <el-button type="success" style="margin-left: 5px" size="small" @click="handleReset">重置</el-button>
            <el-button type="primary" style="margin-left: 5px" size="small" @click="handleAdd" round>新增</el-button>
        </div>
        <el-table :data="tableData" :header-cell-style="{ background: '#f3f6fd', color: '#555' }" border>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="account" label="职工工号"></el-table-column>
            <el-table-column prop="level" label="职级"></el-table-column>
            <el-table-column prop="role_id" label="角色">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.role_id === 0 ? 'danger' : (scope.row.role_id === 1 ? 'primary' : 'success')"
                        disable-transitions>{{
                            scope.row.role_id === 0 ? '超级管理员' : (scope.row.role_id === 1 ? '管理员'
                                : '用户')
                        }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="age" label="年龄"> </el-table-column>
            <el-table-column prop="phone" label="电话"> </el-table-column>
            <el-table-column prop="operate" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit-outline" title="编辑" size="small"
                        @click="handleEdit(scope.$index, scope.row)" circle>
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete-solid" size="small" title="删除"
                        @click="handleDelete(scope.$index, scope.row)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" center>
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="职工工号" prop="account">
                    <el-col :span="20">
                        <el-input v-model="form.account"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="职级" prop="levelOption">
                    <el-col :span="20">
                        <el-select v-model="form.level" placeholder="请选择职级" clearable>
                            <el-option v-for="item in levelOption" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-col :span="20">
                        <el-input v-model="form.password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-col :span="20">
                        <el-input v-model="form.age"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-col :span="20">
                        <el-input v-model="form.phone"></el-input>
                    </el-col>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            total: 0, // 总数
            pageSize: 10, // 每页几条数据
            currentPage: 1, // 当前是第几页
            searchUserName: '',
            searchUserLevel: '',
            levelOption: [
                { value: '青铜',label: '青铜' },
                { value: '白银',label: '白银' },
                { value: '黄金',label: '黄金' },
                { value: '铂金',label: '铂金' },
                { value: '钻石',label: '钻石' },
                { value: '星耀',label: '星耀' },
                { value: '王者',label: '王者' },
            ],
            dialogVisible: false,
            form: {
                account: '',
                name: '',
                password: '',
                age: '',
                phone: '',
                level: '',
                sex: '男',
                role_id: '2',
                id: ''
            },
            rules: {
                account: [
                    { required: true,message: '请输入账号',trigger: 'blur' },
                    { min: 2,max: 10,message: '长度在2-10个字符',trigger: 'blur' }
                ],
                name: [
                    { required: true,message: '请输入姓名',trigger: 'blur' },
                    { min: 2,max: 10,message: '长度在2-10个字符',trigger: 'blur' }
                ],
                password: [
                    { required: true,message: '请输入密码',trigger: 'blur' },
                    { min: 3,max: 10,message: '长度在3-10个字符',trigger: 'blur' }
                ],
                age: [
                    { required: false,message: '请输入年龄',trigger: 'blur' },
                    { pattern: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,message: '请输入正确的年龄',trigger: 'blur' }
                ],
                phone: [
                    { required: false,message: '请输入手机号',trigger: 'blur' },
                    { pattern: /^1[3-9]\d{9}$/,message: '请输入正确的手机号',trigger: 'blur' }
                ]
            },
            title: '新增用户',
            operateType: 'add',
        }
    },
    beforeMount () {
        this.$store.commit('setHeaderTitle',"账号管理")
        this.getUser()
    },
    methods: {
        getUser () {
            this.tableData = [];
            let query = {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
                searchUserName: this.searchUserName,
                searchUserLevel: this.searchUserLevel,
            };
            this.$axios.post('/user/list',query)
                .then(res => {
                    if (res.data.status === 200) {
                        this.tableData = res.data.results;
                        this.total = res.data.total;
                    }
                })
        },
        // 每页条数
        handleSizeChange (e) {
            this.pageSize = e;
            this.getUser();
        },
        // 第几页
        handleCurrentChange (e) {
            this.currentPage = e;
            this.getUser();
        },
        // 搜索
        handleSearch () {
            this.getUser()
        },
        // 重置按钮
        handleReset () {
            this.searchUserName = ''
            this.searchUserLevel = ''
            this.getUser()
        },

        handleEdit (index,row) {
            // console.log(row)
            this.operateType = 'mod'
            this.dialogVisible = true
            this.title = '编辑用户'
            this.form = row
            this.form.sex = row.sex
            this.form.password = row.password
            this.form.level = row.level
        },
        handleDelete (index,row) {
            this.$confirm('此操作将永久删除该用户，是否继续？',"提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`/user/delete/${row.id}`)
                    .then(res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getUser()
                    })
            })
        },

        // 新增按钮的点击函数
        handleAdd () {
            this.dialogVisible = true
            this.operateType = 'add'
            this.resetForm()
        },

        // 提交新增或编辑按钮的回调函数
        submitForm (formName) {
            const url = this.operateType == 'add' ? '/user/add' : `/user/mod/${this.form.id}`
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$axios.post(url,this.form)
                        .then(res => {
                            if (res.data.status === 200) {
                                this.$message.success('操作成功!')
                                this.dialogVisible = false
                                this.resetForm()
                                this.getUser()
                            } else {
                                this.$message.error('操作失败，请更换账号重试！')
                            }
                        })
                        .catch(err => {
                            this.$message.error('操作失败，请更换账号重试！')
                            this.form.account = ''
                        })
                } else {
                    this.$message.warning('请输入有效的数据')
                }
            })
        },

        // 重置表单中的内容
        resetForm () {
            this.form = {
                account: '',
                name: '',
                password: '',
                age: '',
                phone: '',
                sex: '男',
                level: '',
            }
            // this.$refs.form.resetFields()
        }
    },
}
</script>

<style scoped>
.pagination {
    float: right;
    margin-top: 10px;
}
</style>