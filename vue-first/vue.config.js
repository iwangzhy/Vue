const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // disable lintOnSave
  lintOnSave: false,
  // 配置代理服务器
  // 配置一
  /*  // 1. 只能配置 1 个代理服务器
    // 2. 不能控制请求是否走代理
    devServer: {
      proxy: 'https://wangzhy.com'
    }*/
  // 配置二
  devServer: {
    proxy: {
      '/wangzhy': {
        target: 'https://wangzhy.com',
        ws: true, // websocket
        changeOrigin: true,
        pathRewrite: {'^/wangzhy': ''} // 把请求的 "/wangzhy" 去掉
      }
    }
  }
})
