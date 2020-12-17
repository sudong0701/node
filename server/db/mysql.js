const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql"
})

db.sql = function (sql, data = '') {
    return new Promise((resolve, reject)=> {
        db.query(sql, data, (err, result)=> {
            if(err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

db.connect( (err)=> {
    if(err) throw err
    console.log('连接成功')
})

module.exports = db
