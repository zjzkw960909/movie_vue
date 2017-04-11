<template lang="pug">
div
    transition(name="custom-classes-transition", 
        enter-active-class="animated slideInLeft", 
        leave-active-class="animated slideOutLeft")
        graph-page(v-on:out="cancel", v-show="showPage", :href="href", :pages="list.pages")
    .contain
        .top
            mt-header(title="图解详情")
                mt-button(icon="back", slot="left")
                mt-button(icon="more", slot="right")
            mt-navbar(v-model="selected")
                mt-tab-item(id=1) 图解
                mt-tab-item(id=2) 我要吐槽
        div(@click="show")
            .graphs(v-if="selected === '1'")
                Graph(v-for="(v, k) in list.data", type="detail", key="k", :data="v")
            .comments(v-if="selected === '2'")
                Comment
            
    
</template>

<script>
import Graph from '../components/Graph'
import GraphPage from '../components/GraphPage'
import Comment from '../components/Comment'
export default {
    name: 'graphDetail',
    components: {Graph, GraphPage, Comment},
    data () {
        return {
            selected: '1',
            showPage: 0,
            href: ''
        }
    },
    computed: {
        graphId () {
            return this.$route.params.ID
        },
        list () {
            return this.$store.getters.graphDetailList
        }
    },
    created () {
        this.href = '/' + this.$route.name + '/' + this.graphId
        this.$store.dispatch('getGraphDetailList', 'graphId=' + this.graphId + '&page=' + this.$route.params.PAGE)
    },
    beforeRouteUpdate (to, from, next) {
        this.$store.dispatch('getGraphDetailList', 'page=' + to.params.PAGE)
        next()
    },
    methods: {
        cancel (e) {
            this.showPage = e
        },
        show () {
            this.showPage = !this.showPage
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contain{
    background:rgba(244,244,244, 1);
}
.top{
    position:fixed;
    top:0;
    width:100%;
}
.graphs{
    margin-top:89px;
    padding:6px 12px
}
.comments{
    margin-top:89px;
}
</style>
