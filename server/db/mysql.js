const mysql = require('mysql')

const db = mysql.createConnection({
    host: "116.62.141.204",
    user: "root",
    password: "dNSxhsbWaxNPhCRn",
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
