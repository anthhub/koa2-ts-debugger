import Router  from 'koa-router';
import * as controller  from'../controller/base'

const router = new Router()

router.get('/', controller.getRedirectPosts)

export const routes = router.routes()