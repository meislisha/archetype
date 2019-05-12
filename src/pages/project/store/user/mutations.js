// import * as types from "./mutation-types"

// const mutations={
//     [types.SET_USERINFO](state, userinfo) {
//         state.userinfo = userinfo
//     },
//     [types.SET_TOKEN](state, userinfo) {
//       state.userinfo = userinfo
//     }
// }
// export default mutations
export default {
  setUserInfo(state, userinfo) {
    state.userinfo = {
      ...state.userinfo,
      ...userinfo
    }
  },
  setUserState(state, userState) {
    state.state = {
      ...state.state,
      ...userState
    }
  },
  setUserToken(state, userToken) {
    state.token = userToken
  }
}