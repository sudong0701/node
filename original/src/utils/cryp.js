const crypto = require('crypto')

//密钥
const SECRET_KEY = 'WJiol_8776#'

//md5加密
function md5(content) {
	let md5 = crypto.createHash('md5')
	return md5.update(content).digest('hex')
}

//加密函数
function genPasssword(password) {
	const str = `password=${password}&key=${SECRET_KEY}`
	return md5(str)
}

console.log(genPasssword('123'))

module.exports = {
	genPasssword
}