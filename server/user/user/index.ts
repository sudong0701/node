


const mysql = require('../../db/mysql');
const common = require('../../utils/common')
const moment = require('moment')
const city = require('../../config/js/city-data')

interface loginReauestConfig {
    username: string,
    password: string
}

module.exports = app => {
    //登录接口
    app.post('/login', function (req, res, next) {
        //获取参数
        let query: loginReauestConfig = req.body, username: string = query.username, password: string = query.password
        const sql: string = `select * from user where username = '${username}'`
        mysql.sql(sql).then((result: Array<userInfoConfig>) => {
            if (!result.length) {   //没有该条数据
                const sendData: sendDataConfig<undefined> = { note: '该用户未注册', code: 201 }
                res.send(sendData)
            } else {
                if (result[0].password == password) {
                    const sendData: sendDataConfig<userInfoConfig> = { note: '登录成功', code: 200, data: result[0] }
                    res.send(sendData)
                } else {
                    const sendData: sendDataConfig<undefined> = { note: '密码错误', code: 201 }
                    res.send(sendData)
                }
            }
        }).catch((err) => {
            const sendData: sendDataConfig<undefined> = { note: '操作失败', code: 210 }
            res.send(sendData)
        })

    })
    //注册接口
    app.post('/register', function (req, res, next) {
        try {
            let query:loginReauestConfig = req.body, username:string = query.username, password:string = query.password, id:string = common.generateID()
            if (!username) {
                const sendData: sendDataConfig<undefined> = { note: '账号不能为空', code: 201 }
                res.send(sendData)
                return
            }
            if (!password) {
                const sendData: sendDataConfig<undefined> = { note: '密码不能为空', code: 201 }
                res.send(sendData)
                return
            }
            let user = { username: username, password: password, id: id, createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }
            let city = { id: id }
            const sql_query = `select * from user where username = '${username}'`

            mysql.sql(sql_query).then((result) => {
                if (result.length) {   //有该条数据 已经注册
                    const sendData: sendDataConfig<undefined> = { note: '该用户已注册', code: 201 }
                    res.send(sendData)
                } else {
                    const sql = `insert into user set ?`
                    const sql_city = `insert into city set ?`
                    let registerUser = new Promise((resolve, reject) => {
                        mysql.sql(sql, user).then((result) => {
                            resolve(result)
                        }).catch((err) => {
                            reject(err)
                        })
                    })

                    let registerCity = new Promise((resolve, reject) => {
                        mysql.sql(sql_city, city).then((result) => {
                            resolve(result)
                        }).catch((err) => {
                            reject(err)
                        })
                    })

                    Promise.all([registerUser, registerCity])
                        .then(() => {
                            const sendData: sendDataConfig<undefined> = { note: '注册成功', code: 200 }
                            res.send(sendData)
                        }).catch((err) => {
                            const sendData: sendDataConfig<any> = { note: '操作失败', code: 210, data: err }
                            res.send(sendData)
                        })
                }
            }).catch((err) => {
                const sendData: sendDataConfig<any> = { note: '操作失败', code: 210, data: err }
                res.send(sendData)
            })
        }
        catch (err) {
            console.log(err)
        }
    })

    //查询所有用户
    app.get('/queryAllUser', function (req, res, next) {
        const sql_queryAll:string = `select * from user`
        mysql.sql(sql_queryAll).then((result: Array<userInfoConfig>) => {
            const sendData: sendDataConfig<Array<userInfoConfig>> = { note: '操作成功', code: 200, data: result }
            res.send(sendData)
        }).catch((err) => {
            const sendData: sendDataConfig<any> = { note: '操作失败', code: 210, data: err }
            res.send(sendData)
        })
    })

    //删除用户
    app.post('/deleteUser', function (req, res, next) {
        const userID:string = req.body.userID
        if (common.isEmpty(userID)) {
            const sendData: sendDataConfig<undefined> = { note: '参数错误', code: 201 }
            res.send(sendData)
            return
        }
        const sql_query:string = `select * from user where id = '${userID}'`
        mysql.sql(sql_query).then((result) => {
            if (!result.length) {   //没有该条数据
                const sendData: sendDataConfig<undefined> = { note: '该用户不存在', code: 201 }
                res.send(sendData)
            } else {
                const sql_delete:string = `delete from user where id = '${userID}'`
                mysql.sql(sql_delete).then((result) => {
                    const sendData: sendDataConfig<undefined> = { note: '删除成功', code: 200 }
                    res.send(sendData)
                }).catch((err) => {
                    const sendData: sendDataConfig<any> = { note: '删除失败', code: 210, data: err }
                    res.send(sendData)
                })
            }
        }).catch((err) => {
            const sendData: sendDataConfig<any> = { note: '删除失败', code: 210, data: err }
            res.send(sendData)
        })
    })

    //修改用户
    app.post('/modifyUser', function (req, res, next) {
        const userID = req.body.userID, userInfo = req.body.userInfo, cityArr = userInfo.cityArr
        if (common.isEmpty(userID)) {
            const sendData: sendDataConfig<undefined> = { note: '缺少userID', code: 203 }
            res.send(sendData)
            return
        }
        if (common.isEmpty(userInfo)) {
            const sendData: sendDataConfig<undefined> = { note: '缺少userInfo', code: 201 }
            res.send(sendData)
            return
        }
        const sql_query = `select * from user where id = '${userID}'`
        mysql.sql(sql_query).then((result) => {
            if (!result.length) {   //没有该条数据
                const sendData: sendDataConfig<undefined> = { note: '该用户不存在', code: 201 }
                res.send(sendData)
            } else {
                const regionName = `${city[cityArr[0]].label}/${city[cityArr[0]].children[cityArr[1]].label}/${city[cityArr[0]].children[cityArr[1]].children[cityArr[2]].label}`

                const sql_delete = `update user set name='${userInfo.name}', age='${userInfo.age}', hobby='${userInfo.hobby}', job='${userInfo.job}', phone='${userInfo.phone}', updateTime='${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', region='${userInfo.cityArr}', address='${userInfo.address}', sex='${userInfo.sex}', introduction='${userInfo.introduction}', birthday='${userInfo.birthday}', regionName='${regionName}' where id = '${userID}'`

                let sql_city = `update city set province='${userInfo.cityArr[0]}', city='${userInfo.cityArr[1]}', district='${userInfo.cityArr[2]}' where id = '${userID}'`
                let modifyUser = new Promise((resolve, reject) => {
                    mysql.sql(sql_delete).then((result) => {
                        resolve(result)
                    }).catch((err) => {
                        reject(err)
                    })
                })

                let modifyCity = new Promise((resolve, reject) => {
                    mysql.sql(sql_city).then((result) => {
                        resolve(result)
                    }).catch((err) => {
                        reject(err)
                    })
                })

                Promise.all([modifyUser, modifyCity])
                    .then(() => {
                        const sendData: sendDataConfig<undefined> = { note: '修改成功', code: 200 }
                        res.send(sendData)
                    }).catch((err) => {
                        const sendData: sendDataConfig<any> = { note: '修改失败', code: 210, data: err }
                        res.send(sendData)
                    })
            }
        }).catch((err) => {
            res.send({ note: '操作失败', code: 210, data: err } as sendDataConfig<any>)
        })
    })

    //修改密码  2021.7.2暂时弃用
    // app.post('/modifyPassword', function (req, res, next) {
    //     const username = req.body.username
    //     const password = req.body.password
    //     const newPassword = req.body.newPassword
    //     if(common.isEmpty(username)) {
    //         res.send(template.returnValue('缺少username', 201))
    //         return
    //     }
    //     if(common.isEmpty(password)) {
    //         res.send(template.returnValue('缺少password', 201))
    //         return
    //     }

    //     const sql_query =  `select * from user where id = '${userID}'`
    //     mysql.sql(sql_query).then((result)=> {
    //         if(!result.length) {   //没有该条数据
    //             res.send(template.returnValue('该用户不存在', 201))
    //         } else {
    //             const sql_delete =  `update user set name='${newName}' where id = '${userID}'`
    //             mysql.sql(sql_delete).then((result)=> {
    //                 res.send(template.returnValue('修改成功', 200))
    //             }).catch((err)=> {
    //                 res.send(template.returnValue('修改失败', 210, err))
    //             })
    //         }
    //     }).catch((err)=> {
    //         res.send(template.returnValue('操作失败', 210, err))
    //     })
    // })

    //查询用户信息
    app.get('/queryUserInfo', function (req, res, next) {
        const userID = req.query.userID
        if (common.isEmpty(userID)) {
            res.send({ note: '缺少userID', code: 203 } as sendDataConfig<undefined>)
            return
        }
        const sql_queryUserInfo = `select * from user where id = '${userID}'`

        const sql_queryCityInfo = `select * from city where id = '${userID}'`

        let queryUser = new Promise((resolve, reject) => {
            mysql.sql(sql_queryUserInfo).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject()
            })
        })

        let queryCity = new Promise((resolve, reject) => {
            mysql.sql(sql_queryCityInfo).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject()
            })
        })
        Promise.all([queryUser, queryCity])
            .then((result) => {
                let { address, age, birthday, createTime, hobby, introduction, job, name, phone, regionName, sex, updateTime, id, nickname, password, region, username } = result[0][0]
                let cityInfo = {
                    cityArr: [result[1][0].province, result[1][0].city, result[1][0].district]
                }
                const userInfo: userInfoConfig = Object.assign(cityInfo, { address, age, birthday, createTime, hobby, introduction, job, name, phone, regionName, sex, updateTime, id, nickname, password, region, username })
                res.send({ note: '操作成功', code: 200, data: userInfo } as sendDataConfig<userInfoConfig>)
            }).catch((err) => {
                res.send({ note: '操作失败', code: 210, data: err } as sendDataConfig<any>)
            })
    })


}

export {

 }