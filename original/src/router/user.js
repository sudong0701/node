const { login } = require('../controller/user') 
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { set, get } = require('../db/redis')

const handleUserRouter = (req, res) => {
	const method = req.method

	//登录
	if (method === 'POST' && req.path === '/api/user/login') {
		const { username, password } = req.body
		const result = login(username, password)
		return result.then((data) => {
			if (data.username) {
				//设置session
				req.session.username = data.username
				req.session.realname = data.realname
				set(req.sessionId, req.session)
				return new SuccessModel(data, '登录成功')
			} else {
				return new ErrorModel('登录失败')
			}
		})
	}
}

module.exports = handleUserRouter
