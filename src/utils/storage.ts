/**
    * 设置token
    * @param { Object } Token token信息
    * @return
*/
export const setToken = (token: Token) => {
    localStorage.setItem('token', JSON.stringify(token))
}

/**
    * 设置token
    * @param 
    * @return { Object } token信息
*/
export const getToken = ():Token => {
    const token: Token = JSON.parse(localStorage.getItem('token') as string)
    return token
}

export const removeToken = () => {
    localStorage.removeItem('token')
}