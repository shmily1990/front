const path = require('path')
const sourceMap = process.env.NODE_ENV === 'development'
module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // chainWebpack: config => {},
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    config['externals'] = {
      AMap: 'AMap',
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.styl'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          '~styl': path.resolve(__dirname, './src/style'),
          '@c': path.resolve(__dirname, './src/components'),
        },
      },
    })
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: sourceMap,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  // 在生产构建中对babel & TS使用线程加载器
  // 如果机器有超过1个核，则默认启用
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === "darwin",
    // // host: "localhost",
    // port: 8090, //8080,
    // https: false,
    // hotOnly: false,
    // proxy: {
    //   // 设置代理
    //   // proxy all requests starting with /api to jsonplaceholder
    //   "/api": {
    //     target: "http://localhost:8080/",
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
}
