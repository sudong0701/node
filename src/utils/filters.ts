/**
    * 过滤数字
    * @param { String } val 待校验的数据
    * @return { String } 过滤后的数据
*/
const filterNumber = (val: string): string => {
	return val.replace(/[^\d]/g, "")
}

const filterDecimal = (val: string, decimalNum: number): string => {
	val = val.replace(/[^\d\.]/g, ""); //过滤非数字和.
	val = val
		.replace(".", "$#$")
		.replace(/\./g, "")
		.replace("$#$", "."); //去除多余的.
	let regStr = "^(\\-)*(\\d+)\\.(";
	for (let i = 0; i < decimalNum; i++) {
		regStr += "\\d";
	}
	regStr += ").*$";
	const decimalReg = new RegExp(regStr);
	return val.replace(decimalReg, "$1$2.$3");
}
/**
    * 过滤word类型(数字字母汉字)
    * @param { String } val 待校验的数据
    * @return { String } 过滤后的数据
*/
const filterWord = (val: string):string => {
	return val.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g, "")
}
/**
    * 过滤密码类型(数字字母特殊符号)
    * @param { String } val 待校验的数据
    * @return { String } 过滤后的数据
*/
const filterPassword = (val: string):string => {
	return val.replace(/[^A-Za-z0-9\,\.\'\;\/\\\]\[\=\-\<\>\?\:\"\{\}\(\)\!\@\#\$\%\^\&\*\+\_\，\。\、\；\‘\’\【\】\《\》\？\：\“\”\｛\｝\￥\！\（\）\|\…\……\—\——]/g, "")
}

export {
	filterNumber,
	filterDecimal,
	filterWord,
	filterPassword
}