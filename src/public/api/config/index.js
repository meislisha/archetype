import factory from '@factory/api-factory';
import { errorPlugin, toastPlugin, loadingplugin } from '@touna/factoryCell';

//loading插件
factory.use(loadingplugin);
// toast插件
factory.use(toastPlugin);
// 错误插件
factory.use(errorPlugin);
//暂时不用 注释掉为啥会返回空？？？


//注册加载器
factory.registerLoader((requestPathOrName,apiConfig) => {
    let path = 'request.js'
    //判断自定义名称或者路径
    // if(requestPathOrName == 'xxx'){
    //     path = 'xxx.js'
    // }
    return import("@/public/api/request/" + path)
})

