module.exports = {
    lintOnSave: false,
    runtimeCompiler:true,
    //outputDir:'../src/main/webapp', //指定输出目录
    productionSourceMap: true,
    devServer: {
        proxy: 'http://192.168.1.251:8166', //项目实际端口
        port: 8081,
        open: false
    }
}