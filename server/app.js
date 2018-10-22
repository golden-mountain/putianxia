const Koa = require('koa')
const proxy = require('koa-proxy');
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

// koa-proxy2 to 
// app.use(proxy('132.232.26.28:7474'));
// app.use(proxy({
//   proxy_rules: [
//     {
//       proxy_location: /db\/data/,
//       proxy_pass: 'http://132.232.26.28:7474/',
//       proxy_micro_service: false,
//       proxy_merge_mode: true,
//       keep_query_string: true,
//     }
//   ]
// }));
app.use(proxy({
  host: 'http://132.232.26.28:7474/', // proxy alicdn.com...
  match: /db\/data/        // ...just the /static folder
}));
// 使用响应处理中间件
// app.use(response)

// // 解析请求体
// app.use(bodyParser())

// // 引入路由分发
// const router = require('./routes')
// app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
