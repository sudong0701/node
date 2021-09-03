const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { set, get } = require('./src/db/redis')
const { access } = require('./src/utils/log')

const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	console.log('d.toGMTString() is', d.toGMTString())
	return d.toGMTString()
}

const getPostData = (req) => {
	return new Promise((resolve, reject) => {
		if (req.method !== 'POST') {
			resolve({})
			return
		}


		let postData = ''
		req.on('data', chunk => {
			postData += chunk.toString()
		})

		req.on('end', () => {
			if (!postData) {
				resolve({})
				return
			}
			resolve(JSON.parse(postData))
		})
	})
}

const serverHandle = (req, res) => {
	//记录access 日志

	access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${new Date().getTime()}`)
	//设置返回格式 JSON
	res.setHeader('Content-type', 'application/json')

	const url = req.url
	req.path = url.split('?')[0]
	req.query = querystring.parse(url.split('?')[1])

	//处理cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || ''
	cookieStr.split(';').forEach(item => {
		if (!item) {
			return
		}
		const arr = item.split('=')
		const key = arr[0].trim()
		const value = arr[1].trim()
		req.cookie[key] = value
	});


	//解析session
	let needSetCookie = false
	let userId = req.cookie.userid

	new Promise((resolve, reject) => {
		if (userId) {
			get(userId).then((val) => {
				if (val) {
					req.session = val
				} else {
					req.session = {}
				}
				req.sessionId = userId
				resolve()
			})
		} else {
			needSetCookie = true
			userId = `${new Date().getTime()}_${Math.random()}`
			req.sessionId = userId
			req.session = {}
			resolve()
		}

	}).then(() => {
		getPostData(req).then(postData => {
			req.body = postData

			const blogResult = handleBlogRouter(req, res)
			if (blogResult) {
				blogResult.then((blogData) => {
					if (needSetCookie) {
						res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
					}

					res.end(
						JSON.stringify(blogData)
					)
				})
				return
			}

			//处理user路由
			const userResult = handleUserRouter(req, res)

			if (userResult) {
				userResult.then((userData) => {
					if (needSetCookie) {
						res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
					}
					res.end(
						JSON.stringify(userData)
					)
				})
				return
			}

			//未命中路由 返回404
			res.writeHead(404, { "Content-type": "text/plain" })
			res.write("404 Not Found\n")
			res.end()
		})
	})

}

module.exports = serverHandle