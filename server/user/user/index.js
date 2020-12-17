const mysql = require('../../db/mysql');
const template = require('../../utils/template')
const common = require('../../utils/common')
const moment = require('moment')
const city = require('../../../src/assets/js/city-data')

module.exports = app => {
    //登录接口
    app.post('/login', function (req, res, next) {
        //获取参数
        let query = req.body, username = query.username, password = query.password
        const sql =  `select * from user where username = '${username}'`
        mysql.sql(sql).then((result)=> {
            if(!result.length) {   //没有该条数据
                res.send(template.returnValue('该用户未注册', 201))
            } else {
                if(result[0].password == password) {
                    res.send(template.returnValue('登录成功', 200, result[0]))
                } else {
                    res.send(template.returnValue('密码错误', 201))
                }
            }
        }).catch((err)=> {
            res.send(template.returnValue('操作失败', 210, err))
        })

    })
    //注册接口
    app.post('/register', function (req, res, next) {
        try {
            let query = req.body, username = query.username, password = query.password, id = common.generateID()
            if(!username) {
                res.send(template.returnValue('账号不能为空', 201))
                return
            }
            if(!password) {
                res.send(template.returnValue('密码不能为空', 201))
                return
            }
            let user = {username: username, password: password, id: id, createTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}
            let city = {id: id}
            const sql_query =  `select * from user where username = '${username}'`

            mysql.sql(sql_query).then((result)=> {
                if(result.length) {   //有该条数据 已经注册
                    res.send(template.returnValue('该用户已注册', 201))
                } else {
                    const sql =  `insert into user set ?`
                    const sql_city =  `insert into city set ?`
                    let registerUser = new Promise((resolve, reject)=> {
                        mysql.sql(sql, user).then((result)=> {
                            resolve(result)
                        }).catch((err)=> {
                            reject(err)
                        })
                    })

                    let registerCity = new Promise((resolve, reject)=> {
                        mysql.sql(sql_city, city).then((result)=> {
                            resolve(result)
                        }).catch((err)=> {
                            reject(err)
                        })
                    })

                    Promise.all([registerUser, registerCity])
                        .then(()=> {
                            res.send(template.returnValue('注册成功', 200))
                        }).catch((err)=> {
                            res.send(template.returnValue('操作失败', 210, err))
                    })
                }
            }).catch((err)=> {
                res.send(template.returnValue('操作失败', 210, err))
            })
        }
        catch(err) {
            console.log(err)
        }
    })

    //查询所有用户
    app.get('/queryAllUser', function (req, res, next) {
        const sql_queryAll =  `select * from user`
        mysql.sql(sql_queryAll).then((result)=> {
            res.send(template.returnValue('操作成功', 200, result))
        }).catch((err)=> {
            res.send(template.returnValue('操作失败', 210, err))
        })
    })

    //删除用户
    app.post('/deleteUser', function (req, res, next) {
        const userID = req.body.userID
        if(common.isEmpty(userID)) {
            res.send(template.returnValue('参数错误', 201))
            return
        }
        const sql_query =  `select * from user where id = '${userID}'`
        mysql.sql(sql_query).then((result)=> {
            if(!result.length) {   //没有该条数据
                res.send(template.returnValue('该用户不存在', 201))
            } else {
                const sql_delete =  `delete from user where id = '${userID}'`
                mysql.sql(sql_delete).then((result)=> {
                    res.send(template.returnValue('删除成功', 200))
                }).catch((err)=> {
                    res.send(template.returnValue('删除失败', 210, err))
                })
            }
        }).catch((err)=> {
            res.send(template.returnValue('操作失败', 210, err))
        })
    })

    //修改用户
    app.post('/modifyUser', function (req, res, next) {
        const userID = req.body.userID, userInfo = req.body.userInfo, cityArr = userInfo.cityArr
        if(common.isEmpty(userID)) {
            res.send(template.returnValue('缺少userID', 203))
            return
        }
        if(common.isEmpty(userInfo)) {
            res.send(template.returnValue('缺少userInfo', 201))
            return
        }
        const sql_query =  `select * from user where id = '${userID}'`
        mysql.sql(sql_query).then((result)=> {
            if(!result.length) {   //没有该条数据
                res.send(template.returnValue('该用户不存在', 201))
            } else {
                const regionName = `${city[cityArr[0]].label}/${city[cityArr[0]].children[cityArr[1]].label}/${city[cityArr[0]].children[cityArr[1]].children[cityArr[2]].label}`

                const sql_delete =  `update user set name='${userInfo.name}', age='${userInfo.age}', hobby='${userInfo.hobby}', job='${userInfo.job}', phone='${userInfo.phone}', updateTime='${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', region='${userInfo.cityArr}', address='${userInfo.address}', sex='${userInfo.sex}', introduction='${userInfo.introduction}', birthday='${userInfo.birthday}', regionName='${regionName}' where id = '${userID}'`

                let sql_city = `update city set province='${userInfo.cityArr[0]}', city='${userInfo.cityArr[1]}', district='${userInfo.cityArr[2]}' where id = '${userID}'`
                let modifyUser = new Promise((resolve, reject)=> {
                    mysql.sql(sql_delete).then((result)=> {
                        resolve()
                    }).catch((err)=> {
                        reject(err)
                    })
                })

                let modifyCity = new Promise((resolve, reject)=> {
                    mysql.sql(sql_city).then((result)=> {
                        resolve()
                    }).catch((err)=> {
                        reject(err)
                    })
                })

                Promise.all([modifyUser, modifyCity])
                    .then(()=> {
                        res.send(template.returnValue('修改成功', 200))
                    }).catch((err)=> {
                        res.send(template.returnValue('修改失败', 210, err))
                })
            }
        }).catch((err)=> {
            console.log(err)
            res.send(template.returnValue('操作失败', 210, err))
        })
    })

    //修改密码
    app.post('/modifyPassword', function (req, res, next) {
        const username = req.body.username
        const password = req.body.password
        if(common.isEmpty(username)) {
            res.send(template.returnValue('缺少username', 201))
            return
        }
        if(common.isEmpty(password)) {
            res.send(template.returnValue('缺少password', 201))
            return
        }
        const sql_query =  `select * from user where id = '${userID}'`
        mysql.sql(sql_query).then((result)=> {
            if(!result.length) {   //没有该条数据
                res.send(template.returnValue('该用户不存在', 201))
            } else {
                const sql_delete =  `update user set name='${newName}' where id = '${userID}'`
                mysql.sql(sql_delete).then((result)=> {
                    res.send(template.returnValue('修改成功', 200))
                }).catch((err)=> {
                    res.send(template.returnValue('修改失败', 210, err))
                })
            }
        }).catch((err)=> {
            res.send(template.returnValue('操作失败', 210, err))
        })
    })

    //查询用户信息
    app.get('/queryUserInfo', function (req, res, next) {
        console.log(req.query)
        const userID = req.query.userID
        if(common.isEmpty(userID)) {
            res.send(template.returnValue('缺少userID', 203))
            return
        }
        const sql_queryUserInfo =  `select * from user where id = '${userID}'`

        const sql_queryCityInfo = `select * from city where id = '${userID}'`

        let queryUser = new Promise((resolve, reject)=> {
            mysql.sql(sql_queryUserInfo).then((result)=> {
                resolve(result)
            }).catch((err)=> {
                reject()
            })
        })

        let queryCity = new Promise((resolve, reject)=> {
            mysql.sql(sql_queryCityInfo).then((result)=> {
                resolve(result)
            }).catch((err)=> {
                reject()
            })
        })
        Promise.all([queryUser, queryCity])
            .then((result)=> {
            let {address, age, birthday, createTime, hobby, introduction, job, name, phone, regionName, sex, updateTime} = result[0][0]
            let cityInfo = {
                cityArr: [result[1][0].province, result[1][0].city, result[1][0].district]
            }
            res.send(template.returnValue('操作成功', 200, Object.assign(cityInfo, {address, age, birthday, createTime, hobby, introduction, job, name, phone, regionName, sex, updateTime})))
        }).catch((err)=> {
            res.send(template.returnValue('操作失败', 210, err))
        })
    })


}