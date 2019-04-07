import mysql from 'mysql'




export default class DB {
    private pool

    constructor(config) {
        this.pool = mysql.createPool({
            host: config.database.HOST,
            user: config.database.USERNAME,
            password: config.database.PASSWORD,
            database: config.database.DATABASE,
            port: config.database.PORT
        })
    }

    private query(sql, values?) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err)
                } else {
                    connection.this.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    }

    public createTable(sql) {
        return this.query(sql, [])
    }

    // 注册用户
    public insertData(value) {
        let _sql = 'insert into users set name=?,pass=?,avator=?,moment=?;'
        return this.query(_sql, value)
    }
    // 删除用户
    public deleteUserData(name) {
        let _sql = `delete from users where name="${name}";`
        return this.query(_sql)
    }
    // 查找用户
    public findUserData(name) {
        let _sql = `select * from users where name="${name}";`
        return this.query(_sql)
    }
    // 发表文章
    public insertPost(value) {
        let _sql = 'insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;'
        return this.query(_sql, value)
    }
    // 增加文章评论数
    public addPostCommentCount(value) {
        let _sql = 'update posts set comments = comments + 1 where id=?'
        return this.query(_sql, value)
    }
    // 减少文章评论数
    public reducePostCommentCount(value) {
        let _sql = 'update posts set comments = comments - 1 where id=?'
        return this.query(_sql, value)
    }

    // 更新浏览数
    public updatePostPv(value) {
        let _sql = 'update posts set pv= pv + 1 where id=?'
        return this.query(_sql, value)
    }

    // 发表评论
    public insertComment(value) {
        let _sql = 'insert into comment set name=?,content=?,moment=?,postid=?,avator=?;'
        return this.query(_sql, value)
    }
    // 通过名字查找用户
    public findDataByName(name) {
        let _sql = `select * from users where name="${name}";`
        return this.query(_sql)
    }
    // 通过名字查找用户数量判断是否已经存在
    public findDataCountByName(name) {
        let _sql = `select count(*) as count from users where name="${name}";`
        return this.query(_sql)
    }
    // 通过文章的名字查找用户
    public findDataByUser(name) {
        let _sql = `select * from posts where name="${name}";`
        return this.query(_sql)
    }
    // 通过文章id查找
    public findDataById = id => {
        let _sql = `select * from posts where id="${id}";`
        return this.query(_sql)
    }
    // 通过文章id查找
    public findCommentById = id => {
        let _sql = `select * from comment where postid="${id}";`
        return this.query(_sql)
    }

    // 通过文章id查找评论数
    public findCommentCountById = id => {
        let _sql = `select count(*) as count from comment where postid="${id}";`
        return this.query(_sql)
    }

    // 通过评论id查找
    public findComment = id => {
        let _sql = `select * from comment where id="${id}";`
        return this.query(_sql)
    }
    // 查询所有文章
    public findAllPost = () => {
        let _sql = `select * from posts;`
        return this.query(_sql)
    }
    // 查询所有文章数量
    public findAllPostCount = () => {
        let _sql = `select count(*) as count from posts;`
        return this.query(_sql)
    }
    // 查询分页文章
    public findPostByPage = page => {
        let _sql = ` select * from posts limit ${(page - 1) * 10},10;`
        return this.query(_sql)
    }
    // 查询所有个人用户文章数量
    public findPostCountByName(name) {
        let _sql = `select count(*) as count from posts where name="${name}";`
        return this.query(_sql)
    }
    // 查询个人分页文章
    public findPostByUserPage = (name, page) => {
        let _sql = ` select * from posts where name="${name}" order by id desc limit ${(page - 1) * 10},10 ;`
        return this.query(_sql)
    }
    // 更新修改文章
    public updatePost = values => {
        let _sql = `update posts set title=?,content=?,md=? where id=?`
        return this.query(_sql, values)
    }
    // 删除文章
    public deletePost = id => {
        let _sql = `delete from posts where id = ${id}`
        return this.query(_sql)
    }
    // 删除评论
    public deleteComment = id => {
        let _sql = `delete from comment where id=${id}`
        return this.query(_sql)
    }
    // 删除所有评论
    public deleteAllPostComment = id => {
        let _sql = `delete from comment where postid=${id}`
        return this.query(_sql)
    }

    // 滚动无限加载数据
    public findPageById = page => {
        let _sql = `select * from posts limit ${(page - 1) * 5},5;`
        return this.query(_sql)
    }
    // 评论分页
    public findCommentByPage = (page, postId) => {
        let _sql = `select * from comment where postid=${postId} order by id desc limit ${(page - 1) * 10},10;`
        return this.query(_sql)
    }
}
