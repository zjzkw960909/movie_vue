<template lang="pug">
div
    el-dialog(title="新增", v-model="dialogFormVisible")
        el-input(v-show="title",placeholder="请输入题目", v-model="titleModel")
        el-input(style="margin:10px 0", type="textarea", :rows="2", placeholder="请输入详细描述", v-model="desc")
        el-upload(class="avatar-uploader", action="/api/upload", :show-file-list="false", :on-success="handleAvatarScucess", :before-upload="checkUpload")
            img(v-if="imageUrl", :src="imageUrl", class="avatar")
            i(v-else class="el-icon-plus avatar-uploader-icon")
        el-button(style="float:right;margin:4px", @click="sub", type="success") 确定
        el-button(style="float:right;margin:4px", @click="cancel", type="warning") 取消
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'hello',
    props: ['title'],
    data () {
        return {
            titleModel: '',
            desc: '',
            imageUrl: ''
        }
    },
    computed: mapGetters({
        dialogFormVisible: 'getDialogGraph'
    }),
    methods: {
        init () {
            this.titleModel = ''
            this.desc = ''
            this.imageUrl = ''
        },
        cancel () {
            this.init()
            this.$store.dispatch('changeDialogStatus', false)
        },
        sub () {
            let http = this.$http
            let post = {name: this.titleModel, desc: this.desc, pic: this.imageUrl, date: (new Date()).toLocaleDateString()}
            http.post('/api/graph', post).then((res) => {
                this.$store.dispatch('getGraphList', 'page=1')
            })
            this.init()
            this.$store.dispatch('changeDialogStatus', false)
        },
        handleAvatarScucess (res) {
            this.imageUrl = res.path
        },
        checkUpload () {
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
