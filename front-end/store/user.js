import PlanApi from '@/utils/PlansApi.js'
export const namespaced = true

export const state = () => ({
	user: {},
	validPlans: [],
	activePlan: {
		id: null,
	},
	activePlanIndex: null,
	selectedDate: '',
})

export const getters = {
	userData: (userState) => userState.user,
	userId: (userState) => userState.user.id,
	posts: (userState) => userState.activePosts,
	plans: (userState) => userState.validPlans,
	activePlan: (userState) => userState.activePlan.id,
	activePlanIndex: (userState) => userState.activePlanIndex,
	selectedDate: (userState) => userState.selectedDate,
}
export const actions = {
	async signInUser({ state: userState, commit }, { email, password } = {}) {
		const { data } = await PlanApi.login(email, password)
		const plans = await PlanApi.getActiveUserPlans(data.id)

		commit('setUser', data)
		commit('updatePlanList', plans.data)

		const posts = await PlanApi.getPostsByPlan(
			userState.activePlan.id,
			userState.user.id
		)

		commit('updatePostList', posts.data)

		userState.refetchData = false
	},
	async fetchPlans({ state: userState, commit }) {
		const { data } = await PlanApi.getActiveUserPlans(userState.user.id)

		commit('updatePlanList', data)
	},

	async fetchPosts({ state: userState, commit }) {
		const { data } = await PlanApi.getPostsByPlan(
			userState.activePlan.id,
			userState.user.id
		)

		commit('updatePostList', data)
	},
	async refetchUserData({ dispatch }) {
		await dispatch('fetchPlans')
		await dispatch('fetchPosts')
	},
}
export const mutations = {
	updatePlanList(userState, activeUserPlans) {
		userState.validPlans = activeUserPlans
	},
	updatePostList(userState, posts) {
		userState.activePosts = posts
	},
	setUser(userState, user) {
		userState.user = user
	},
	setActivePlan(userState, plan) {
		userState.activePlan = plan
		userState.activePlanIndex = userState.validPlans.indexOf(plan)
	},
	setActivePlanIndex(userState, index) {
		userState.activePlanIndex = index
	},
	selectPlanPostsDate(userState, date) {
		userState.selectedDate = date
	},
}
