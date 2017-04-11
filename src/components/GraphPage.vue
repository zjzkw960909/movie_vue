<template lang="pug">
.page
    ul(@click="goto")
        li(v-for="v in page") {{ v }}
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
    props: ['pages', 'href'],
    data () {
        return {
        }
    },
    computed: {
        page () {
            let arr = []
            let pages = this.pages
            for (let i = 1; i <= pages; i++) {
                arr.push(`第${i}页`)
            }
            return arr
        }
    },
    methods: {
        innerClick () {
            this.$emit('out', 0)
        },
        goto (e) {
            let page = e.target.textContent.split('')[1]
            this.$router.push(this.href + '/' + page)
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
