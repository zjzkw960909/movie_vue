<template lang="pug">
.comment
    img.image(src="../assets/a.jpg")
    .rest
        .top
            .left 名字
            .right
                i.fa.fa-thumbs-o-up
                span 67
        .middle 阿福违法排放卡上打飞机啊收到了反抗撒娇的快乐飞机撒点开了房间里开始打飞机卢卡斯的加夫里什大家福利卡上的九分裤拉萨的肌肤立刻撒的肌肤看来是大家快来分
        .bottom 2013年12月12日
</template>

<script>
export default {
    name: 'comment',
    data () {
        return {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment {
    display:flex;
    padding:10px;
    border-bottom:1px solid #ccc;
}
.image{
    width:40px;
    height:40px;
}
.rest{
    flex:1;
    font-size:16px;
    box-sizing:border-box;
    padding:4px 10px
}
.left{
    display:inline-block;
}
.right{
    display:inline-block;
    float:right;
}
.right i{
    margin-right:4px;
}
.top{
    color:#666;
}
.middle{
    word-wrap:break-word;
    word-break:break-all;
    width:100%;
    color:#888;
    margin:3px 0;
}
.bottom{
    color:#999;
    font-size:15px;
}
</style>
