// import mssql from 'mssql'
// import async from './../../middlewares/error-handing';

// export default class DB {
//     private pool

//    constructor(config) {
//         this.pool = mssql.createPool({
//             host: config.database.HOST,
//             user: config.database.USERNAME,
//             password: config.database.PASSWORD,
//             database: config.database.DATABASE,
//             port: config.database.PORT
//         })
//     }

//     private async connectPool(config){
//         this.pool = await mssql.connect(config)
//     }


//     private query(sql, values?) {
//         return new Promise((resolve, reject) => {
//             this.pool.getConnection((err, connection) => {
//                 if (err) {
//                     reject(err)
//                 } else {
//                     connection.this.query(sql, values, (err, rows) => {
//                         if (err) {
//                             reject(err)
//                         } else {
//                             resolve(rows)
//                         }
//                         connection.release()
//                     })
//                 }
//             })
//         })
//     }

//     public createTable(sql) {
//         return this.query(sql, [])
//     }

// }
