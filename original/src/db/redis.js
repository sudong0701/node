const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建redis客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', (err) => {
	console.log(err)
})

const set = (key, val) => {
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}
	redisClient.set(key, val, redis.print)
}

const get = (key) => {
	return new Promise((resolve, reject) => {
		redisClient.get(key, (err, val) => {
			if (err) {
				reject(err)
				return
			}
			if (val == null) {
				resolve(null)
				return
			}
			//兼容JSON形式
			try {
				resolve(JSON.parse(val))
			} catch (ex) {
				resolve(val)
			}
		})
	})
}

module.exports = {
	set,
	get
}