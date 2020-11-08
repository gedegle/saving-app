import PlanApi from '@/utils/PlansApi.js'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
export const namespaced = true
Vue.use(VueCookies)
export const state = () => ({
	user: {},
	validPlans: [],
	activePlan: {
		id: null,
	},
	activePlanIndex: null,
	selectedDate: '',
	activePosts: [],
})

export const getters = {
	userData: (userState) => userState.user,
	userId: (userState) => userState.user.id,
	posts: (userState) => userState.activePosts,
	plans: (userState) => userState.validPlans,
	activePlan: (userState) => userState.activePlan?.id,
	activePlanIndex: (userState) => userState.activePlanIndex,
	selectedDate: (userState) => userState.selectedDate,
}
export const actions = {
	async setUser({ state: userState, commit }, { user } = {}) {
		const plans = await PlanApi.getActiveUserPlans(user.id)
		commit('setUser', user)
		commit('updatePlanList', plans.data)
		this.$auth.fetchUser()

		const posts = await PlanApi.getPostsByPlan(userState.activePlan.id)

		commit('updatePostList', posts.data)

		userState.refetchData = false
	},
	async signInUser({ state: userState, commit }, { email, password } = {}) {
		const { data } = await this.$auth.loginWith('local', {
			data: { email, password },
		})
		this.$auth.setUser(data.data)
		if (data.data.planCount === 0) {
			this.$router.push('/naujas-planas')
		}
		Vue.$cookies.set('password', password)
		Vue.$cookies.set('email', email)
		const plans = await PlanApi.getActiveUserPlans(data.data.id)
		commit('setUser', data.data)
		commit('updatePlanList', plans.data)

		userState.refetchData = false
	},
	async fetchPlans({ state: userState, commit }) {
		const { data } = await PlanApi.getActiveUserPlans(userState.user.id)

		commit('updatePlanList', data)
	},

	async fetchPosts({ state: userState, commit }) {
		const { data } = await PlanApi.getPostsByPlan(
			userState.activePlan?.id,
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
