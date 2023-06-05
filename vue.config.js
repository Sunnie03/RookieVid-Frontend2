const { defineConfig } = require('@vue/cli-service')
//const { resolve } = require('path-browserify')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].favicon = './public/favicon.ico'; // 添加此行，将其设置为您新图标文件的路径
        return args;
      })
  },
})

