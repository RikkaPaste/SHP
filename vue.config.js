module.exports={
    //关闭eslint
    lintOnSave:false,
    devServer:{
        proxy:{
            '/api':{
                target:"http://39.98.123.211",//如果请求中带有/api运行代理目标:http://39.98.123.211
                // pathRewrite:{'^/api':''}//重写路径
            }
        }
    }
}