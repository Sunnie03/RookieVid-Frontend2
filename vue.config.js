const { defineConfig } = require('@vue/cli-service')
//const { resolve } = require('path-browserify')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
})

