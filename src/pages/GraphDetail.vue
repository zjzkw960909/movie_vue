<template lang="pug">
div
    transition(name="custom-classes-transition", 
        enter-active-class="animated slideInLeft", 
        leave-active-class="animated slideOutLeft")
        graph-page(v-on:out="cancel", v-show="showPage")
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
                Graph(type="detail")
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
            showPage: 0
        }
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
