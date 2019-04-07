
import chalk from 'chalk'

import { testSql } from '../modal'
export const getRedirectPosts = async ctx => {
    // ctx.redirect('/posts')

    const rs = await testSql()

    ctx.body = rs




    

}
