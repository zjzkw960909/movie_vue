import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export default {
    getGraphList (cb, query) {
        Vue.http.get(`/api/graph?${query}`).then((res) => {
            cb(res.data)
        })
    },
    getGraphDetailList (cb, query) {
        Vue.http.get(`/api/graphDetail?${query}`).then((res) => {
            cb(res.data)
        })
    }
}
