const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getList, getDetail, newBlog, deleteBlog, updateBlog } = require('../controller/blog')
//统一的登录验证
const loginCheck = (req) => {
	if (!req.session.username) {
		return Promise.resolve(() => {
			new ErrorModel('尚未登录')
		})
	}
}


const handleBlogRouter = (req, res) => {
	const method = req.method

	//获取博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		let author = req.query.author || ''
		const keyword = req.query.keyword || ''
		// const listData = getList(author, keyword)
		// return new SuccessModel(listData)
		if (req.query.isadmin) {
			const loginCheckResult = loginCheck(req)
			if (loginCheckResult) {
				//未登录
				return loginCheckResult
			}
			//查询自己的博客
			author = req.session.username
		}
		const listResult = getList(author, keyword)
		return listResult.then((listData) => {
			return new SuccessModel(listData)
		})
	}

	//获取博客详情
	if (method === 'GET' && req.path === '/api/blog/detail') {
		const id = req.query.id || ''
		const detailData = getDetail(id)
		const result = getDetail(id)
		return result.then((detailData) => {
			return new SuccessModel(detailData)
		})
		// return new SuccessModel(detailData)
	}

	//新建一篇博客
	if (method === 'POST' && req.path === '/api/blog/new') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			return loginCheckResult 
		}
		const blogData = req.body
		blogData.author = req.session.username
		const result = newBlog(blogData)
		return result.then((data) => {
			return new SuccessModel(data)
		})
		// const data = newBlog(blogData)
		// return  new SuccessModel(data)
	}

	//更新一篇博客
	if (method === 'POST' && req.path === '/api/blog/update') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			return loginCheckResult 
		}
		const blogData = req.body
		const result = updateBlog(blogData.id, blogData)
		return result.then((val) => {
			if (val) {
				return new SuccessModel()
			} else {
				return new ErrorModel('更新博客失败')
			}
		})
	}

	//删除一篇博客
	if (method === 'POST' && req.path === '/api/blog/delete') {
		const loginCheckResult = loginCheck(req)
		if (loginCheckResult) {
			return loginCheckResult 
		}
		const id = req.query.id || ''
		const result = deleteBlog(id, req.session.username)
		return result.then((val) => {
			if (val) {
				return new SuccessModel()
			} else {
				return new ErrorModel('删除博客失败')
			}
		})
	}
}

module.exports = handleBlogRouter
