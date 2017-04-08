<template lang="pug">
div
    section(v-if="type === 'list'")
        img.image(src="../assets/a.jpg")
        .desc
            .title 这个是我的题目
            .detail 详细心嘻嘻
        .bottom
            .person
                i.fa.fa-user-circle-o
                span 名字
            .watch
                i.fa.fa-eye
                span 433万
            .click
                i.fa.fa-thumbs-up
                span 19万
    section(v-else)
        img.image1(src="../assets/a.jpg")
        .desc
            .detail(style="font-size:16px") 详细心嘻嘻
</template>

<script>
export default {
    name: 'graph',
    props: ['type'],
    data () {
        return {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section{
    background:#fff;
    width:100%;
    box-shadow:0px 0px 2px #aaa;
    margin-bottom:8px;
}
.image{
    width:100%;
    height:104px;
}
.image1{
    width:100%;
    height:204px;
}
.desc{
    padding:8px;
}
.detail{
    color:#98989b;
    font-size:14px;
    margin:8px 0;
}
.bottom{
    color:#98989b;
    font-size:14px;
    border-top:1px solid #e4e2e2;
    margin:0 10px;
    padding:6px 0;
    display:flex;
    flex-wrap:nowrap;
    align-items:center;
}
.bottom span{
    margin-left:3px;
}
.bottom i {
    font-size:16px;
}
.person{
    flex:2
}
.watch{
    flex:1
}
.click{
    flex:1
}
</style>
