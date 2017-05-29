<template lang="pug">
div
    AdminHeader
    .contain
        nav
            el-menu(default-active="1",theme="dark",@open="handleOpen",@close="handleClose", class="outHeight")
                el-submenu(index="1")
                    template(slot="title") gif图解
                    router-link(to="/admin/graph-list/1")
                        el-menu-item(index="1-1") gif主题管理
                    router-link(to="/admin")
                        el-menu-item(index="1-2") gif评论管理
                el-menu-item(index="2") 票选图解
                el-menu-item(index="3") 导航三
        article
            .top {{ title }}
            .pad
                router-view
                       
        



</template>

<script>
import AdminHeader from '../components/AdminHeader'

export default {
    name: 'admin',
    components: {AdminHeader},
    data () {
        return {
        }
    },
    computed: {
        title () {
            return this.$store.state.animate.adminTitle
        }
    },
    methods: {
        handleOpen () {
        },
        handleClose () {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contain{
    display:flex;
    width:100%;
    height:100%;
}
nav{
    width:200px;
    display:inline-block;
}
.outHeight{
    min-height:480px;
}
article{
    flex:1;
    height:100%;
    box-sizing:border-box;
}
.pad{
    padding:10px;
}
.top{
    background:#eef1f6;
    margin-top:10px;
    font-size:15px;
    padding:15px;
    color:#666;
}
</style>
