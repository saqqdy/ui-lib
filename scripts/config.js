/**
 * @Description:
 * @Author: saqqdy
 * @LastEditors: saqqdy
 * @Date: 2021-03-05 20:36:32
 * @LastEditTime: 2021-07-14 09:37:10
 */
var path = require('path')
var pkg = require('../package.json')
var nodeExternals = require('webpack-node-externals')
var Components = require('../components.json'),
    externals = {}

Object.keys(Components).forEach(function (key) {
    externals[`yun-ui/package/${key}`] = `yun-ui/lib/${key}`
})

externals = [
    Object.assign(
        {
            vue: 'vue'
        },
        externals
    ),
    nodeExternals()
]

exports.externals = externals
exports.version = pkg.version

exports.alias = {
    '@': path.resolve(__dirname, '../src'),
    package: path.resolve(__dirname, '../package'),
    examples: path.resolve(__dirname, '../examples'),
    'yun-ui': path.resolve(__dirname, '../')
}

exports.vue = {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
}

exports.vueUmd = {
    root: 'Vue',
    commonjs: 'Vue',
    commonjs2: 'Vue',
    amd: 'Vue'
}

exports.jsexclude = /node_modules/
