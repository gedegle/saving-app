<template>
	<div class="navigation">
		<div class="navigation__buttons-wrapper">
			<nuxt-link
				class="navigation__button"
				:to="{
					path: '/pagrindinis',
					query: {
						plan: activePlan,
					},
				}"
			>
				Pagrindinis
			</nuxt-link>
			<nuxt-link
				class="navigation__button"
				:to="{
					path: '/statistika',
					query: {
						plan: activePlan,
					},
				}"
			>
				Statistika
			</nuxt-link>
			<nuxt-link
				class="navigation__button"
				:to="{
					path: '/istorija',
					query: {
						plan: activePlan,
					},
				}"
			>
				Istorija
			</nuxt-link>
		</div>
		<button class="navigation__archive-button" @click="archivePlan">
			Archyvuoti planą
		</button>
	</div>
</template>

<script>
import PlansApi from '@/utils/PlansApi.js'
import { mapGetters } from 'vuex'
import calculateSavings from '@/mixins/calculateSavings.js'

export default {
	mixins: [calculateSavings],
	computed: {
		...mapGetters({
			plans: 'user/plans',
			activePlanIndex: 'user/activePlanIndex',
			activePlan: 'user/activePlan',
			activePosts: 'user/posts',
		}),
	},
	methods: {
		goToPage(link) {
			this.$router.push(link)
		},
		archivePlan() {
			if (this.activePlanIndex === 0) {
				PlansApi.archivePlan(this.activePlan, 0)
				this.$router.push({
					path: '/naujas-planas',
				})
				return
			}
			const activePlan = this.activePlan
			this.$store.commit(
				'user/setActivePlan',
				this.plans[this.activePlanIndex - 1]
			)
			PlansApi.archivePlan(activePlan, 0)
			setTimeout(() => {
				this.$store.dispatch('user/refetchUserData')
				setTimeout(
					() => this.calculateSavings(this.plans[this.activePlanIndex]),
					500
				)
			}, 700)
		},
	},
}
</script>

<style lang="scss" scoped>
.navigation {
	$this: &;

	display: flex;
	justify-content: space-between;
	padding-top: 10px;
	padding-bottom: 27px;

	&__button {
		font-weight: 400;
		color: white;
		border-radius: 26px;
		margin-right: 20px;
		text-decoration: none;

		&:first-child {
			padding: 7px 40px;
		}

		&:nth-child(2) {
			padding: 7px 45px;
		}

		&:nth-child(3) {
			padding: 7px 55px;
		}

		&:hover,
		&:focus,
		&.nuxt-link-exact-active,
		&.nuxt-link-active {
			background-color: $color-pink-primary;
		}
	}

	&__archive-button {
		background-color: $color-light;
		color: $color-purple-primary;
		width: 164px;
		padding: 7px 0;
		border-radius: 26px;

		&:hover {
			background-color: $color-grey--200;
		}
	}
}
</style>
