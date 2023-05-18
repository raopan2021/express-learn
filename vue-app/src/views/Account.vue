<template>
    <div>
        <div class="search" style="margin-bottom: 5px">
            <el-input placeholder="请输入姓名" style="width: 200px" suffix-icon="el-icon-search" v-model="searchContent"
                @keyup.enter.native="handleSearch"></el-input>
            <el-select v-model="sex" placeholder="请选择性别" style="margin-left: 5px; width: 200px">
                <el-option v-for="item in sexs" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 5px" size="small" @click="handleSearch">搜索</el-button>
            <el-button type="success" style="margin-left: 5px" size="small" @click="handleReset">重置</el-button>
            <el-button type="primary" style="margin-left: 5px" size="small" @click="handleAdd" round>新增</el-button>
        </div>
        <el-table :data="tableData" :header-cell-style="{ background: '#f3f6fd', color: '#555' }" border>
            <el-table-column prop="name" label="姓名"> </el-table-column>
            <el-table-column prop="account" label="职工工号"> </el-table-column>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
            </el-pagination>
        </div>

        <el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-col :span="20">
                        <el-input v-model="form.name"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="职工工号" prop="account">
                    <el-col :span="20">
                        <el-input v-model="form.account" :disabled="isAbled"></el-input>
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
                <el-button @click="centerDialogVisible = false" size="small">取 消</el-button>
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
            allTableData: [],  // 存放所有表格数据以及搜索后的数据
            filterTableData: [],  // 存放所有表格数据供搜索
            paginations: {
                page_index: 1,  // 当前页
                total: 0,  // 总数
                page_size: 10,  // 默认每页显示多少条
                page_sizes: [5,10,15,20],  // 选择每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper"
            },
            searchContent: '',
            sex: '',
            sexs: [
                { value: '男',label: '男' },
                { value: '女',label: '女' },

            ],
            centerDialogVisible: false,
            form: {
                account: '',
                name: '',
                password: '',
                age: '',
                phone: '',
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
            isAbled: false,
        }
    },
    methods: {
        getUser () {
            this.$axios.get('/user/list')
                .then(res => {
                    if (res.data.status === 200) {
                        // this.tableData = res.data.results
                        this.allTableData = res.data.results
                        this.filterTableData = res.data.results
                        this.setPaginations()
                    }
                    // console.log(res)
                })
        },
        handleEdit (index,row) {
            // console.log(row)
            this.operateType = 'mod'
            this.centerDialogVisible = true
            this.isAbled = true
            this.title = '编辑用户'
            this.form = row
            this.form.sex = row.sex
            this.form.password = row.password

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

        // 分页相关函数
        setPaginations () {
            this.paginations.total = this.allTableData.length
            this.paginations.page_index = 1
            this.tableData = this.allTableData.filter((item,index) => index < this.paginations.page_size)
            // console.log(this.allTableData[0])

        },
        handleSizeChange (page_size) {
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.tableData = this.allTableData.filter((item,index) => {
                return index < page_size
            })

        },
        // 页面跳转
        handleCurrentChange (page) {
            const index = this.paginations.page_size * (page - 1)
            const nums = this.paginations.page_size * page
            const tables = []
            for (let i = index; i < nums; i++) {
                if (this.allTableData[i]) tables.push(this.allTableData[i])
            }
            this.tableData = tables
        },

        // 搜索
        handleSearch () {
            if (!this.searchContent && !this.sex) {
                this.$message({ type: 'warning',message: '请输入用户姓名或性别进行查询' })
                this.getUser()
                return
            }
            // 这里有两种方法可以实现通过姓名的模糊查询
            // 第一种，在返回的数据中，通过filter函数模糊查询，使用filter中的includes方法实现模糊查询
            // 加入性别后，这里的查询显得有点啰嗦了，后面还需要改进
            if (this.searchContent && this.sex) {
                this.allTableData = this.filterTableData.filter((item,index) => {
                    return item.name.includes(this.searchContent) && item.sex === this.sex
                })
                this.setPaginations()
            }
            if (this.searchContent && !this.sex) {
                this.allTableData = this.filterTableData.filter((item,index) => {
                    return item.name.includes(this.searchContent)
                })
                this.setPaginations()
            }
            if (!this.searchContent && this.sex) {
                this.allTableData = this.filterTableData.filter((item,index) => {
                    return item.sex === this.sex
                })
                this.setPaginations()
            }


            // 第二种，后端写了模糊查询的接口，接口为/user/searchByName，然后传递name参数，注意，这里之前使用的get请求，
            // 后来发现get请求不适用于传参的请求，改成post请求后就可以正常获取数据了，
            // 由于还有一个是通过性别来查询，我在后端没有写性别查询的接口，所以这里就使用第一种查询方法了
            // this.$axios.post('/user/searchByName', { name: this.searchContent })
            //     .then(res => {
            //         if (res.data.status === 200) {
            //             this.allTableData = res.data.results
            //             this.setPaginations()
            //         } else {
            //             this.$message.warning('请求数据出错')
            //         }
            //     })
        },

        // 重置按钮的点击函数
        handleReset () {
            this.searchContent = ''
            this.sex = ''
            this.getUser()
        },

        // 新增按钮的点击函数
        handleAdd () {
            this.centerDialogVisible = true
            this.operateType = 'add'
            this.isAbled = false
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
                                this.centerDialogVisible = false
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
                sex: '男'
            }
            // this.$refs.form.resetFields()
        }

    },
    beforeMount () {
        this.$store.commit('setHeaderTitle',"账号管理")
    },
    created () {
        this.getUser()
    },
}
</script>

<style scoped>
.pagination {
    float: right;
    margin-top: 10px;
}
</style>