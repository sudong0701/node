/**
    * 用户名/工号的校验函数
    * @param { String } val 待校验的数据
    * @return { Boolean } 校验是否通过
*/
const validJobNumber = (val: string): boolean => {
	return /^[0-9]{5}$/.test(val)
}

/**
    * 密码的校验函数
    * @param { String } val 待校验的数据
    * @return { Boolean } 校验是否通过
*/
const validPassword = (val: string): boolean => {
	return /^[A-Za-z0-9\\,\.\'\;\/\\\]\[\=\-\<\>\?\:\"\{\}\(\)\!\@\#\$\%\^\&\*\+\_\，\。\、\；\‘\’\【\】\《\》\？\：\“\”\｛\｝\￥\！\（\）\|\…\……\—\——\s]{6,16}$/.test(val)
}

/**
    校验手机号
    @param {String} phone 手机号
    @return {Boolean} 是否校验通过
*/
const validPhone = (phone: string):boolean => {
	if (/^(1)[0-9]{10}$/.test(phone)) {
		return true
	}
	return false
}

/**
    校验邮箱
    @param {String} email 邮箱
    @return {Boolean} 是否校验通过
*/
const validEmail = (email: string):boolean => {
	if (new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$").test(email)) {
		return true
	}
	return false
}



export {
    validJobNumber,
    validPassword,
    validEmail,
    validPhone
}