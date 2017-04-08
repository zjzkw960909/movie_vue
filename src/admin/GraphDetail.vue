<template lang="pug">
div
    el-dialog(title="编辑", v-model="dialogFormVisible", @close="cancel")
        el-input(style="margin:10px 0", type="textarea", :rows="2", placeholder="请输入详细描述", v-model="desced")
        el-upload(class="avatar-uploader", action="/api/upload", :show-file-list="false", :on-success="handleAvatarScucess")
            img(v-for="v in imageUrl", :src="v", class="avatar")
            i(class="el-icon-plus avatar-uploader-icon")
        el-button(style="float:right;margin:4px", @click="add", type="success") 确定
        el-button(style="float:right;margin:4px", @click="cancel", type="warning") 取消
    .add
        el-input(style="margin:10px 0;flex:4", type="textarea", :rows="2", placeholder="请输入详细描述", v-model="desc")
        el-upload(style="display:inline-block", action="/api/upload", :on-remove="handleRemove", :file-list="fileList", :on-success="succesFiles")
            el-button(size="small" type="success") 点击上传图片
        el-button(style="float:right;margin:4px", @click="add", type="primary") 保存
    el-table(:data="tableData.data", style="width:100%", border)
        el-table-column(prop="desc",label="详细内容",width:140)
        el-table-column(label="图片",width:140)
            template(scope="scope", lang="pug")
                img(v-for="v in JSON.parse(scope.row.pic)", :src="v")
        el-table-column(fixed="right",label="操作",width:140)
            template(scope="scope", lang="pug")
                el-button(type="text", size="small", @click="edit(scope)") 编辑
                el-button(type="text", size="small", @click="del(scope)") 删除
    Page(:allPages='tableData.pages', :page='tableData.page', @changePage="gotoPage")

</template>

<script>
import _ from 'underscore'
import Page from '../components/Page'
export default {
    name: 'admin',
    components: {Page},
    data () {
        return {
            desced: '',
            imageUrl: [],
            dialogFormVisible: false,
            fileList: [],
            uploadFiles: [],
            desc: ''
        }
    },
    computed: {
        graphId () {
            return this.$route.params.ID
        },
        tableData () {
            return this.$store.getters.graphDetailList
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.$store.dispatch('getGraphDetailList', 'page=' + to.params.PAGE)
        next()
    },
    created () {
        this.$store.dispatch('getGraphDetailList', 'graphId=' + this.graphId + '&page=' + this.$route.params.PAGE)
    },
    methods: {
        handleAvatarScucess (res) {
            this.imageUrl.push(res.path)
            this.uploadFiles = this.imageUrl
        },
        handleRemove (file, fileList) {
            this.uploadFiles = _.filter(this.uploadFiles, (v) => {
                return v !== file.response.path
            })
        },
        handlePreview (file) {
            console.log(file)
        },
        succesFiles (res, files) {
            this.uploadFiles.push(res.path)
        },
        gotoPage (e) {
            this.$router.push({path: e})
        },
        init () {
            this.desced = ''
            this.imageUrl = []
            this.dialogFormVisible = false
            this.fileList = []
            this.uploadFiles = []
            this.desc = ''
        },
        add () {
            let http = this.$http
            let post = {graphId: this.graphId, desc: this.desc, pic: JSON.stringify(this.uploadFiles)}
            if (this.editId) {
                post.id = this.editId
                http.put('/api/graphDetail', post).then((res) => {
                    this.$store.dispatch('getGraphDetailList', `graphId=${this.graphId}&page=${this.$route.params.PAGE}`)
                })
            } else {
                http.post('/api/graphDetail', post).then((res) => {
                    this.$store.dispatch('getGraphDetailList', `graphId=${this.graphId}&page=${this.$route.params.PAGE}`)
                })
            }
            this.init()
        },
        sub () {
        },
        cancel () {
            this.init()
        },
        edit (e) {
            let data = e.row
            this.desced = data.desc
            this.imageUrl = JSON.parse(data.pic)
            this.dialogFormVisible = true
            this.editId = data.id
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
                        this.$http.delete('/api/graphDetail?id=' + e.row.id).then((res) => {
                            if (!res.data.status) {
                                instance.confirmButtonLoading = false
                                done()
                                this.$store.dispatch('getGraphDetailList', `graphId=${this.graphId}&page=1`)
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
img{
    width:45px;
    height:45px;
    margin-top:7px
}
</style>
