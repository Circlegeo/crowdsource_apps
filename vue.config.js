// vue.config.js
module.exports = {
    publicPath: '',
    outputDir: 'apps/www',
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    configureWebpack: {
        plugins: [
            require('unplugin-vue-components/webpack')({ /* options */ }),
        ],
    },
}