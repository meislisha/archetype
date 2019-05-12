export default async function (apiConfig = {}, requestParams = {}, extraParams = {}) {
  console.log(apiConfig, requestParams, extraParams, "reuqestA")
  return {
    data: {
      result: {
        userinfo: {
          username: "小明",
          sex: "男",
        },
        state: {},
        token: "xxxx"
      },
      status: "200",
      desc: ""
    }
  }
}
