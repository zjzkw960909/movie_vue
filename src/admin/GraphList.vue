<template lang="pug">
div
    el-button(style="float:right;margin:4px", @click="add", type="primary") 新增
    el-dialog(title="新增", v-model="dialogFormVisible", @close="cancel")
        el-input(placeholder="请输入题目", v-model="titleModel")
        el-input(style="margin:10px 0", type="textarea", :rows="2", placeholder="请输入详细描述", v-model="desc")
        el-upload(class="avatar-uploader", action="/api/upload", :show-file-list="false", :on-success="handleAvatarScucess", :before-upload="checkUpload")
            img(v-if="imageUrl", :src="imageUrl", class="avatar")
            i(v-else class="el-icon-plus avatar-uploader-icon")
        el-button(style="float:right;margin:4px", @click="sub", type="success") 确定
        el-button(style="float:right;margin:4px", @click="cancel", type="warning") 取消
    el-table(:data="tableData.data", style="width:100%", border)
        el-table-column(prop="date",label="日期",width:180)
        el-table-column(prop="name",label="图解名",width:140)
        el-table-column(prop="desc",label="描述",width:140)
        el-table-column(fixed="right",label="操作",width:140)
            template(scope="scope", lang="pug")
                el-button(type="text", size="small", @click="edit(scope)") 编辑
                el-button(type="text", size="small", @click="del(scope)") 删除 
                el-button(type="text", size="small", @click="href(scope)") 查看
    Page(:pages='tableData.pages', :page='tableData.page', @emit="gotoPage")
</template>

<script>
import { mapGetters } from 'vuex'
import Page from '../components/Page'
export default {
    name: 'admin',
    components: {Page},
    data () {
        return {
            editId: null,
            titleModel: '',
            desc: '',
            imageUrl: '',
            dialogFormVisible: false
        }
    },
    computed: mapGetters({
        tableData: 'graphList'
    }),
    created () {
        this.$store.dispatch('getGraphList', 'page=' + this.$route.params.PAGE)
    },
    beforeRouteUpdate (to, from, next) {
        this.$store.dispatch('getGraphList', 'page=' + to.params.PAGE)
        next()
    },
    methods: {
        init () {
            this.titleModel = ''
            this.desc = ''
            this.imageUrl = ''
            this.dialogFormVisible = false
        },
        cancel () {
            this.init()
        },
        sub () {
            let http = this.$http
            let post = {name: this.titleModel, desc: this.desc, pic: this.imageUrl, date: (new Date()).toLocaleDateString()}
            if (this.editId) {
                post.id = this.editId
                http.put('/api/graph', post).then((res) => {
                    this.$store.dispatch('getGraphList', 'page=1')
                })
            } else {
                http.post('/api/graph', post).then((res) => {
                    this.$store.dispatch('getGraphList', 'page=1')
                })
            }
            this.init()
        },
        handleAvatarScucess (res) {
            this.imageUrl = res.path
        },
        checkUpload () {
        },
        add () {
            this.editId = null
            this.dialogFormVisible = true
        },
        href (e) {
            this.$router.push(`/admin/graph-detail/${e.row.id}/1`)
        },
        edit (e) {
            let data = e.row
            this.titleModel = data.name
            this.desc = data.desc
            this.imageUrl = data.pic
            this.dialogFormVisible = true
            this.editId = data.id
        },
        gotoPage (e) {
            this.$router.push(e + '')
        },
        del (e) {
            this.$msgbox({
                title: '提示消息',
                message: '是否删除当前主题?',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true
                        instance.confirmButtonText = '执行中...'
                        this.$http.delete('/api/graph?id=' + e.row.id).then((res) => {
                            if (!res.data.status) {
                                instance.confirmButtonLoading = false
                                done()
                                this.$store.dispatch('getGraphList', 'page=' + this.$route.params.PAGE)
                            }
                        })
                    } else {
                        done()
                    }
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-uploader {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    border: 1px dashed #d9d9d9;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
