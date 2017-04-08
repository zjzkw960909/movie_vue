import api from '../api'
const state = {
    graphList: {data: [], page: '', pages: ''},
    graphDetailList: []
}

const getters = {
    graphList: state => state.graphList,
    graphDetailList: state => state.graphDetailList
}

const actions = {
    getGraphList ({commit}, query) {
        api.getGraphList(data => {
            commit('GET_GRAPH_LIST', data)
        }, query)
    },
    getGraphDetailList ({commit}, query) {
        api.getGraphDetailList(data => {
            commit('GET_GRAPH_DETAIL_LIST', data)
        }, query)
    }
}

const mutations = {
    'GET_GRAPH_LIST' (state, res) {
        state.graphList.data = res.data.map((v) => {
            v.date = v.date.split('T')[0]
            return v
        })
        state.graphList.page = res.page
        state.graphList.pages = res.pages
    },
    'GET_GRAPH_DETAIL_LIST' (state, res) {
        state.graphDetailList = res
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
