<template lang="pug">
.page
    ul
        li 第一页
        li 第一页
        li 第一页
        li 第一页
    .bottom
        .left
            i.fa.fa-eye-slash
            p 护眼
        .right(@click="innerClick")
            i.fa.fa-times
            p 取消
</template>

<script>
export default {
    name: 'graphPage',
    data () {
        return {
        }
    },
    methods: {
        innerClick () {
            this.$emit('out', 0)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page{
    color:#fff;
    width:70%;
    z-index:1222;
    height:100%;
    background:#444;
    position:fixed;
    top:0;
    left:0;
}
.page ul{
    text-align:center;
    margin-top:40px;
    padding-left:0;
    list-style-type:none;
}
.page li{
    font-size:14px;
    border-bottom:1px solid #ccc;
    margin:0 20px;
    padding:10px;
}
.page .bottom{
    box-sizing:border-box;
    position:absolute;
    bottom:15px;
    width:100%;
    height:auto;
    padding:0 30px;
}
.page i{
    font-size:40px
}
.page .left{
    float:left;
}
.page p{
    margin:0;
}
.page .right{
    float:right;
}
</style>
