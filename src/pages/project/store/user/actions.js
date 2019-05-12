// // export default{
// //     async login(){
// //         commit(types.SET_SINGER,{
// //             "userinfo":'lisha'
// //         })
// //     }
// // }

// // export const login=function(){
// //     commit("setUserInfo", {
// //       "nickname": 'lisha'
// //     })
// //      commit("setUserToken", '89898808');
// // }


// // import factory from "@factory/api-factory";

// export default {
//   async login({
//     commit,
//     dispatch
//   }, params = {}) {
//     const {
//       isLoading = true, isToast = false
//     } = params
//     try {
//     //   //对应public/api/project-api-config/api-user文件
//     //   const response = await factory.request('project-api-config/api-user/LOGIN', params, {
//     //     isLoading,
//     //     isToast
//     //   })
//     //   const {
//     //     result = {}
//     //   } = response || {}
//     //   const {
//     //     userinfo = {}, state = {}, token = ""
//     //   } = result
//       commit("setUserInfo", {
//         "nickname": 'lisha'
//       });
//     //   commit("setUserState", state);
//       commit("setUserToken", '9090');
//          commit("setUserInfo", {
//            "nickname": 'lisha'
//          });
//          //   commit("setUserState", state);
//          commit("setUserState", 'sss');
//     } catch (err) {
//       throw err;
//     }
//   }
// }



import factory from "@factory/api-factory";

export default {
  async login({
    commit,
    dispatch
  }, params = {}) {
    const {
      isLoading = true, isToast = false
    } = params
    try {
      //对应public/api/project-api-config/api-user文件
      const response = await factory.request('project-api-config/api-user/LOGIN', params, {
        isLoading,
        isToast
      })
      const {
        result = {}
      } = response || {}
      const {
        userinfo = {}, state = {}, token = ""
      } = result
      commit("setUserInfo", userinfo);
      commit("setUserState", state);
      commit("setUserToken", token);
    } catch (err) {
      throw err;
    }
  }
}