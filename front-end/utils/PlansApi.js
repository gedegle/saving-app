import axios from 'axios'

const API = 'http://localhost:8000/api'
const link = axios.create({
	baseURL: API,
	withCredentials: false,
})
export default {
	async getUserNotes(id) {
		const { data } = await link.get(`/notes/${id}`)

		return data
	},
	async getNoteById(id) {
		const { data } = await link.get(`/note/${id}`)

		return data
	},
	async getActiveUserPlans(id) {
		const { data } = await link.get(`/user-plans/active/${id}`)

		return data
	},
	async getArchivedUserPlans(id, page) {
		const { data } = await link.get(`/user-plans/archived/${id}`, {
			page,
		})

		return data
	},
	async getPostsByPlan(planId) {
		const { data } = await link.get(`/posts-by-plan/${planId}`)
		return data
	},
	async login(email, password) {
		const { data } = await link.post('/auth/login/', {
			email,
			password,
		})
		return data
	},
	async register(user) {
		const { data } = await link.post('/user/', user)
		return data
	},
	async getPlanHistory(id, page) {
		const { data } = await link.get(`/posts/${id}/?page=${page}`)
		return data
	},
	async filterPostsByDate(planId, page, date) {
		const { data } = await link.get(`/posts/${planId}/${date}/?page=${page}`)
		return data
	},
	async getPlanStats(id) {
		const data = await link.get(`/stats/${id}`)

		return data
	},
	updateProfile(info) {
		const data = link.put('/user/update', info)

		return data
	},
	updatePassword(info) {
		const data = link.put('/user/update-pass', info)

		return data
	},
	updatePost(id, post) {
		link.put(`/post/${id}`, post)
	},
	updateNote(data) {
		link.put('/note', data)
	},
	deleteNote(id) {
		link.delete(`/note/${id}`)
	},
	addNote(data) {
		link.post('/note', data)
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
	createPlan(sum, income, userId) {
		const data = link.post('/plan', {
			sum,
			income,
			user_id: userId,
			if_saved: 0,
			status: 1,
		})

		return data
	},
}
