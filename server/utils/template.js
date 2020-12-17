const returnValue = function (note, code = 200, data = {}) {
    return {
        code: code,
        data: data,
        note: note
    }
}

module.exports = {
    returnValue: returnValue
}