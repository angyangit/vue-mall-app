import * as types from './mutation-types'

const matutaions = {
    [types.SET_TOKEN](state, token) {
        state.token = token
    },
    [types.SET_TO_LOGIN_PAGE](state, loginPage) {
        state.toLoginPage = loginPage
    },
    [types.SET_MEMBER_INFO](state, memberInfo) {
        state.memberInfo = memberInfo
    }
}
export default matutaions
