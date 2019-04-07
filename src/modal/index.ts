import Knex from 'knex'
import chalk from 'chalk'
import { db_config } from '../config/'

const knex = Knex(db_config)

export const testSql = async () => {
    const rs = await knex('squid_log_book').select()
    return rs
}
