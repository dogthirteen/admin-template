const state = {
    tltleText: ''
}

const mutations = {
    SET_TITLE: (state, tltleText) => {
        state.tltleText = tltleText
    }
}

const actions = {


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
