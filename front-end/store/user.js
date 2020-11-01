import PlanApi from '@/utils/PlansApi.js'
export const namespaced = true

export const state = () => ({
	user: {},
	validPlans: [],
	archivedPlans: [],
	activePlan: {
		id: 1,
	},
	activePlanIndex: 0,
})

export const getters = {
	posts: (userState) => userState.activePosts,
	plans: (userState) => userState.validPlans,
	archived: (userState) => userState.archivedPlans,
	activePlan: (userState) => userState.activePlan.id,
	activePlanIndex: (state, getters) => {
		let index = ''
		Object.keys(getters.plans).forEach((key) => {
			if (getters.plans[parseInt(key)].id === getters.activePlan) {
				index = key
			}
		})

		return parseInt(index)
	},
}
export const actions = {
	async signInUser({ state: userState, commit }, { email, password } = {}) {
		const { data } = await PlanApi.login(email, password)
		const plans = await PlanApi.getUserPlans(data.id)

		commit('setUser', data)
		commit('updatePlanList', plans.data)
		commit('setActivePlan', plans.data ? plans.data[0] : plans.data)

		const posts = await PlanApi.getPostsByPlan(
			userState.activePlan.id,
			userState.user.id
		)

		commit('updatePostList', posts.data)

		userState.refetchData = false
	},
	async fetchPlans({ state: userState, commit }) {
		const { data } = await PlanApi.getUserPlans(userState.user.id)

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
	updatePlanList(userState, userPlans) {
		userState.validPlans = userPlans.filter((item) => item.status === 1)
		userState.archivedPlans = userPlans.filter((item) => item.status === 0)
	},
	updatePostList(userState, posts) {
		userState.activePosts = posts
	},
	setUser(userState, user) {
		userState.user = user
	},
	setActivePlan(userState, plan) {
		userState.activePlan = plan
	},
}
