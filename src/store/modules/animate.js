const state = {
    dialogGraph: false
}

const getters = {
    getDialogGraph: state => state.dialogGraph
}

const actions = {
    changeDialogStatus ({commit}, data) {
        commit('CHANGE_DIALOG_STATUS', data)
    }
}

const mutations = {
    'CHANGE_DIALOG_STATUS' (state, res) {
        state.dialogGraph = res
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
