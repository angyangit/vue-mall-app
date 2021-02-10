import * as types from './mutation-types'

const matutaions = {
    [types.SET_TOKEN](state, token) {
        state.token = token
    },
    [types.SET_LOGIN_PAGE](state, loginPage) {
        state.loginPage = loginPage
    }
}
export default matutaions
