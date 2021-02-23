module.exports={
    devServer:{
      // proxy:"http://172.20.109.163:9001/", //开发环境的跨域问题解决，后端springboot服务ip 和 端口
      // port: 8081 //dev模式下的前端服务端口，也就是浏览器通过localhost：8085 访问前端页面
      // 例如：http://172.20.109.163:9001/Login/Verify?account=manager&password=654321
      // proxy:{
      //   '/api':{
      //     target:'https://172.20.109.163:19000/Lesso/',
      //     changeOrigin: true,
      //     pathRewrite:{
      //       '^/api':''
      //     }
      //   }
      // }
      // 配置请求拦截
      //  before:require('./mock/index.js')
      // ,
      https: true
    },
    css: {
      extract: false
    }
  };