import * as types from './mutation-types'

const matutaions = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
}
export default matutaions
