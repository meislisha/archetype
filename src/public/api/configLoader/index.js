import factory from '@factory/api-factory';
import { errorPlugin, toastPlugin, loadingplugin } from '@touna/factoryCell';

// loading插件
factory.use(loadingplugin);
// toast插件
factory.use(toastPlugin);
// 错误插件
factory.use(errorPlugin);

//懒加载
factory.registerLoader((requestPathOrName, apiConfig) => {
    return import(`@/public/api/request/${requestPathOrName}`)
});

//加载registerLoader之前执行
factory.useLoader(async ({ request,response },next) => {
    const { apiConfig } = request;
    //apiConfig = "h5Config/homeConfig/API_GET_LIMIT_INFO"  未注册模式，需要懒加载
    //apiConfig = "API_GET_LIMIT_INFO" 已注册模式，直接查找 无需处理
    //apiConfig = { requestPath,url: '/order.do?method=home',method: 'GET' } 配置模式，无需查找  无需处理
    if(typeof apiConfig === 'string' && apiConfig.indexOf('/') > -1){
        let spt = apiConfig.split('/');
        let apiName = spt.pop();
        let apiConfigPath = spt.join('/');

        const apiConfigs = await import(`@/public/api/${apiConfigPath}`);
        if(apiName in apiConfigs){
            request.apiConfig = Object.assign({
                method:'post',
                //默认request
                requestPath:'project-request.js'
            },apiConfigs[apiName]);
        }
    }
    await next();
});
