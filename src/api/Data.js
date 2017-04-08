import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

export default {
    getSellPrice (cb) {
        let price = [{price: '50万以下'}, {price: '50-100万'}, {price: '100-150万'}, {price: '150万以上',}];
        cb(price);
    },
    getSellList (cb, post) {
        Vue.http.post('/api/findSellOne', post).then((res) => {
            cb(res.data.data);
        });
    }
}


