export default function(apiConfig, requestParams = {}, extraParams = {}) {
    requestParams = requestParams || {};
    const { method, url } = apiConfig;
    
    console.log("请求到达这里了：",method,url)

    //这里返回格式 是按照@touna/factoryCell/errorPlugin的处理格式返回的
    return Promise.resolve({
        data:{
            result:{
                userinfo:{ nickname:"Atom",sex:"男", },
                state:{  },
                token:"xxxx"
            },
            status:"200",
            desc:""
        }
    });
  }