<template lang="pug">
div
    AdminHeader
    .contain
        nav
            el-menu(default-active="2",theme="dark",@open="handleOpen",@close="handleClose", class="outHeight")
                el-submenu(index="1")
                    template(slot="title") 导航
                    el-menu-item-group(title="分组一")
                        el-menu-item(index="1-1") 选项一
                        el-menu-item(index="1-2") 选项二
                    el-menu-item-group(title="分组二")
                        el-menu-item(index="1-3") 选项三
                el-menu-item(index="2") 导航二
                el-menu-item(index="3") 导航三
        article
            .top 导航一
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
.top{
    background:#eef1f6;
    margin-top:10px;
    font-size:15px;
    padding:15px;
    color:#666;
}
.pad{
    padding:10px;
}
</style>
