<template lang="pug">
div

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
        var store = this.$store
        store.dispatch('changeAdminTitle', '图解详情')
        store.dispatch('getGraphDetailList', 'graphId=' + this.graphId + '&page=' + this.$route.params.PAGE)
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
            this.$router.push(e + '')
        },
        init () {
            this.desced = ''
            this.imageUrl = []
            this.dialogFormVisible = false
            this.fileList = []
            this.uploadFiles = []
            this.desc = ''
            this.editId = null
        },
        add () {
            let http = this.$http
            let desc
            let uploadFiles
            if (this.editId) {
                desc = this.desced
                uploadFiles = this.imageUrl
            } else {
                desc = this.desc
                uploadFiles = this.uploadFiles
            }
            if (!(desc && this.graphId && uploadFiles.length)) {
                this.$alert('缺少输入项', '提示')
            } else {
                let post = {graphId: this.graphId, desc: desc, pic: JSON.stringify(uploadFiles)}
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
            }
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
