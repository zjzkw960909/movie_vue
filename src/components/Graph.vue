<template lang="pug">
div
    router-link(v-if="type === 'list'", :to="{path: '/graphDetail/' + data.id + '/1'}")
        section
            img.image(:src="data.pic")
            .desc
                .title {{ data.name }}
                .detail {{ data.desc }}
            .bottom
                .person
                    i.fa.fa-user-circle-o
                    span {{ data.date }}
                .watch
                    i.fa.fa-eye
                    span {{ data.watch }}万
                .click
                    i.fa.fa-thumbs-up
                    span {{ data.comments }}万
    section(v-else)
        img.image1(:src="JSON.parse(data.pic)[0]")
        .desc
            .detail(style="font-size:16px") {{ data.desc }}
</template>

<script>
export default {
    name: 'graph',
    props: ['type', 'data'],
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section{
    background:#fff;
    width:100%;
    box-shadow:0px 0px 2px #aaa;
    margin-bottom:20px;
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
a{
    text-decoration:none
}
</style>
