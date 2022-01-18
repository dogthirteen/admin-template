const Timestamp = new Date().getTime() //当前时间为了防止打包缓存不刷新，所以给每个js文件都加一个时间戳
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  // devServer: {
  //   port: '1001',
  //   host: "localhost",
  //   open: true,
  //   proxy: {
  //     '/dev-api/v1': {
  //       target: '', //设置调用的接口域名和端口
  //       changeOrigin: true, //是否跨域
  //       pathRewrite: {
  //         '^/dev-api/v1': '/v1',
  //       },
  //     },
  //   },
  // },
  css: {
    /*为预处理器 loader 传递自定义选项*/
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/theme.scss';`,
      }
    },
  },
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
    },
  },
  chainWebpack: config => {
    //查看打包体积
    // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
  },
}
