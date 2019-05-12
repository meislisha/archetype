// 可能会有多种request处理
// request.js 需要返回 export default function(){}
// 给定字符串路径的目的 1.异步加载 2.区别request
// 处理request的引用路径
const requestPath = 'project-request.js';

//公共参数
const publicParams = {
    method:'post',
    requestPath
}

export const LOGIN = {
    ...publicParams,
    url:'xxxx'
}