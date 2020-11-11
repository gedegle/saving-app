/* eslint-disable no-unused-vars */
import PlanApi from '@/utils/PlansApi.js'
import Vue from 'vue'
import VueCookies from 'vue-cookies'
export const namespaced = true
Vue.use(VueCookies)

export const state = () => ({
	validPlans: [],
	activePlan: {
		id: null,
	},
	activePlanIndex: null,
	selectedDate: '',
	activePosts: [],
	leftToSave: 0,
	saved: 0,
	dateTilSaved: '',
})

export const getters = {
	posts: (userState) => userState.activePosts,
	plans: (userState) => userState.validPlans,
	activePlan: (userState) => userState.activePlan?.id,
	activePlanIndex: (userState) => userState.activePlanIndex,
	selectedDate: (userState) => userState.selectedDate,
	savedAmount: (userState) => userState.saved,
	leftToSave: (userState) => userState.leftToSave,
	totalSavingAmount: (userState) => userState.activePlan?.sum,
	dateTilSaved: (userState) => userState.dateTilSaved,
}
export const actions = {
	async setUser({ state: userState, commit }) {
		const { data } = await PlanApi.getActiveUserPlans(this.$auth.user.id)
		commit('updatePlanList', data)

		const posts = await PlanApi.getPostsByPlan(userState.activePlan.id)

		commit('updatePostList', posts.data)

		userState.refetchData = false
	},
	async signInUser(
		{ state: userState, commit, dispatch },
		{ email, password } = {}
	) {
		await this.$auth.loginWith('local', {
			data: { email, password },
		})
		if (this.$auth.user.planCount === 0) {
			this.$router.push('/naujas-planas')
		}
		const plans = await PlanApi.getActiveUserPlans(this.$auth.user.id)
		commit('setUser', this.$auth.user)
		commit('updatePlanList', plans.data)
		commit('setActivePlan', plans.data[0])
		const { data } = await PlanApi.getPostsByPlan(
			userState.activePlan?.id,
			this.$auth.user.id
		)
		dispatch('calculateSavings', plans.data[0])

		userState.refetchData = false
	},
	async fetchPlans({ state: userState, commit }) {
		const { data } = await PlanApi.getActiveUserPlans(this.$auth.user.id)

		commit('updatePlanList', data)
	},

	async fetchPosts({ state: userState, commit }) {
		const { data } = await PlanApi.getPostsByPlan(
			userState.activePlan?.id,
			this.$auth.user.id
		)

		commit('updatePostList', data)

		return data
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
	setSavingsData(userState, data) {
		userState.leftToSave = data.leftToSave
		userState.saved = data.saved
		userState.dateTilSaved = data.dateTilSaved.toISOString().split('T')[0]
	},
}
