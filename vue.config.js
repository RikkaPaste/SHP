module.exports={
    publicPath: './',
    productionSourceMap:false,
    //关闭eslint
    lintOnSave:false,
    devServer:{
        proxy:{
            '/api':{
                target:"http://gmall-h5-api.atguigu.cn",//如果请求中带有/api运行代理目标:http://gmall-h5-api.atguigu.cn
                // pathRewrite:{'^/api':''}//重写路径
            }
        }
    }
}