const { exec, escape } = require('../db/mysql')
const { genPasssword } = require('../utils/cryp')

const login = (username, password) => {
	username = escape(username)   //防止sql注入
	password = escape(password)   //防止sql注入 
	console.log(password)
	//生成加密算法
	password = genPasssword(password)
	console.log(password)
	const sql = `
		select username, realname from users where \`username\`=${username} and \`password\`="${password}"
	`
	console.log(sql)
	return exec(sql).then((rows) => {
		return rows[0] || {}
	})
}

module.exports = {
	login
} 