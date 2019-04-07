import Koa from 'koa'
import path from 'path'
import Router from 'koa-router'
import koaBody from 'koa-body'
import serve from 'koa-static'
import mount from 'koa-mount'
import logger from 'koa-logger'
import chalk from 'chalk'
import render from 'koa-art-template'
import views from 'koa-views'
import errorHanding from './middlewares/error-handing'
import { routes } from './routers'


import { run_config } from './config'

const app = new Koa()
const { port } = run_config

// error handing
app.use(errorHanding)

// art-template
render(app, {
    root: __dirname + '/views',
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})



// static
app.use(mount('/static', serve(__dirname + '/static')))

// logger
app.use(logger())

// body
app.use(koaBody())

//  路由
app.use(routes)


app.listen(port)
console.log(`koa server started, please open ${chalk.green('http://localhost:' + port)}`)
