<template lang="pug">
.headerWrapper
    header.header
        .container
            h1 图解微信后台
</template>

<script>
export default {
    name: 'adminHeader',
    data () {
        return {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerWrapper{
    height:80px;
}
.header{
    height: 80px;
    background-color: #20a0ff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative
}
.container{
    padding:0 12px;
}
.header h1{
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400
}
</style>
