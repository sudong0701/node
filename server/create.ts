const db = require('./db/mysql')

module.exports = function (app) {
    app.get("/createdb", (req,res)=> {
        let sql = "CREATE DATABASE nodemysql"
        db.query(sql, (err, result)=> {
            if(err) {
                console.log(err)
            } else {
                console.log(result)
                res.send("Database create success...")
            }
        })
    })

    app.get("/createpoststable", (req, res)=> {
        let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255),PRIMARY KEY(ID))"
        db.query(sql, (err, result)=> {
            if(err) {
                console.log(err)
            } else {
                console.log(result)
                res.send("posts表创建成功....")
            }
        })
    })
}