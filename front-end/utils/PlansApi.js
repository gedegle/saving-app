import axios from 'axios'

const API = 'http://localhost:8000/api'
const link = axios.create({
	baseURL: API,
	withCredentials: false,
})
export default {
	async getUserPlans(id) {
		const data = await link.get(`/user-plans/${id}`)

		return data
	},
	async getPostsByPlan(planId, userId) {
		const data = await link.get(`/posts-by-plan/${planId}/${userId}`)
		return data
	},
	async login(email, password) {
		const { data } = await link.post('/login/', {
			email,
			password,
		})
		return data
	},
	async getPlanHistory(id, page) {
		const { data } = await link.get(`/posts/${id}/?page=${page}`)
		return data
	},
	updatePost(id, post) {
		link.put(`/post/${id}`, post)
	},
	deletePost(id) {
		link.delete(`/post/${id}`)
	},
	archivePlan(planId, saved) {
		link.put(`/plan/${planId}`, {
			status: 0,
			if_saved: saved,
		})
	},
	addNewPost(userId, date, sum, planId, type) {
		link.post('/post', {
			user_id: userId,
			date,
			sum,
			plan_id: planId,
			type,
		})
	},
}
