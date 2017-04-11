<template lang="pug">
.contain
    .top
        mt-header(title="恐怖猎奇图解")
            mt-button(icon="more", slot="right")
        mt-navbar(v-model="selected")
            mt-tab-item(id=1) 最新
            mt-tab-item(id=2) 最热
    .graphs
        Graph(v-for="(v, k) in list", type="list", :data="v", key="k")
        
    
</template>

<script>
import Graph from '../components/Graph'

export default {
    name: 'index',
    components: {Graph},
    data () {
        return {
            selected: '1'
        }
    },
    computed: {
        list () {
            return this.$store.getters.graphList.data
        }
    },
    created () {
        this.$store.dispatch('getGraphList', 'page=' + this.$route.params.PAGE)
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
</style>
