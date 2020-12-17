const generateID = function () {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxxxyxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
     return uuid;
}

/**
 是否为空
 @param {String}a 变量
 @return {Boolean} 是否为空
 */
const isEmpty = function (a) {
    if (a === undefined || a === 'undefined' || a === null || a === 'null' || a === '' ||
        JSON.stringify(a) === '{}' || JSON.stringify(a) === '[]') {
        return true
    }
    return false
}

module.exports = {
    generateID: generateID,
    isEmpty: isEmpty
}