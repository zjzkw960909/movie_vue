const state = {
    dialogGraph: false,
    adminTitle: ''
}

const getters = {
    getDialogGraph: state => state.dialogGraph
}

const actions = {
    changeDialogStatus ({commit}, data) {
        commit('CHANGE_DIALOG_STATUS', data)
    },
    changeAdminTitle ({commit}, data) {
        commit('CHANGE_ADMIN_TITLE', data)
    }
}

const mutations = {
    'CHANGE_DIALOG_STATUS' (state, res) {
        state.dialogGraph = res
    },
    'CHANGE_ADMIN_TITLE' (state, res) {
        state.adminTitle = res
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
