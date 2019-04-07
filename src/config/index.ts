export interface I_run_config {
    port: number | string
    prettyLog: boolean
}

export interface I_db_config {
    client: string
    connection: {
        host: string
        user: string
        password: string
        database: string
    }
}

export const run_config: I_run_config = {
    // 运行配置
    port: process.env.NODE_PORT || 3000,
    prettyLog: process.env.NODE_ENV == 'development'
}

export const db_config: I_db_config = {
    client: 'mssql',
    connection: {
        host: 'localhost',
        user: 'sa',
        password: '123',
        database: 'master'
    }
}
