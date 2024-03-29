const { exec } = require('../db/mysql')
const xss  = require('xss')

const getList = (author, keyword) => {
	let sql = `select * from blogs where 1=1 `
	if (author) {
		sql += `and author='${author}' `
	}
	if (keyword) {
		sql += `and title like '%${keyword}%' `
	}
	sql += `order by createtime desc;`

	//返回promise
	return exec(sql)
}

const getDetail = (id) => {
	let sql = `select * from blogs where id='${id}'`
	
	return exec(sql).then((rows) => {
		return rows[0]
	})
}

const newBlog = (blogData = {}) => {
	const title = xss(blogData.title)
	const content = xss(blogData.content)
	const author = xss(blogData.author)
	const createTime = new Date().getTime()
	console.log('title is', title)
	const sql = `
			insert into blogs (title, content, createtime, author)
			values('${title}', '${content}', '${createTime}', '${author}')
		`
	return exec(sql).then((insertData) => {
		return {
			id: insertData.insertId
		}
	})
}

const updateBlog = (id, blogData = {}) => {
	const { title, content } = blogData
	const sql = `
		update blogs set title='${title}', content='${content}' where id=${id}
	`
	return exec(sql).then((updateData) => {
		console.log(updateData)
		if (updateData.affectedRows > 0) {
			return true
		}
		return false
	})
}

//5.9

const deleteBlog = (id, author) => {
	const sql = `
		delete from blogs where id='${id}' and author='${author}';
	`
	return exec(sql).then((deleteData) => {
		console.log(deleteData)
		if (deleteData.affectedRows > 0) {
			return true
		}
		return false
	})
}

module.exports = {
	getList,
	getDetail,
	newBlog,
	updateBlog,
	deleteBlog
}