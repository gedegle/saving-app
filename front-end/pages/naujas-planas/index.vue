<template>
	<loader v-if="!$auth.user || loadingAfterAdded" :loading="!$auth.user" />
	<div v-else class="choose-plan">
		<div class="choose-plan__info-wrapper">
			<my-svg name="saving-pig" class="choose-plan__piggy" />
			<p class="choose-plan__label">Suveskite duomenis</p>
			<p class="choose-plan__info">
				Suveskite sumą, kurią norite sutaupyti, bei apytikslias mėnesines pajamas
				(be mokesčių), kad sistema atliktų skaičiavimus.
			</p>
		</div>
		<div class="choose-plan__parameters-section">
			<div class="choose-plan__parameters-wrapper">
				<div class="choose-plan__parameter-wrapper">
					<p class="choose-plan__parameter-label">Norima sutaupyti suma</p>
					<input
						v-model="sum"
						class="choose-plan__parameter-input"
						type="number"
						placeholder="pvz. 55.7"
					/>
				</div>
				<div class="choose-plan__parameter-wrapper">
					<p class="choose-plan__parameter-label">Vidutinės mėnesio pajamos</p>
					<input
						v-model="income"
						class="choose-plan__parameter-input"
						type="number"
						placeholder="pvz. 350"
					/>
				</div>
			</div>
			<button class="choose-plan__submit-button" @click="createPlan">
				Pasirinkti
			</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlansApi from '@/utils/PlansApi.js'

export default {
	data() {
		return {
			sum: null,
			income: null,
			loadingAfterAdded: false,
			noBackground: true,
		}
	},
	computed: {
		...mapGetters({
			userId: 'user/userId',
			activePlan: 'user/activePlan',
		}),
	},
	watch: {
		$route() {
			if (this.$auth.user) {
				this.noBackground = false
			}
		},
	},
	methods: {
		async createPlan() {
			PlansApi.createPlan(this.sum, this.income, this.userId).then((res) => {
				this.loadingAfterAdded = true
				setTimeout(
					() =>
						this.$router.push({
							path: '/pagrindinis',
							query: {
								plan: res.data.id,
							},
						}),
					1000
				)
			})
			this.loadingAfterAdded = false
			await this.$store.dispatch('user/signInUser', {
				email: this.$cookies.get('email'),
				password: this.$cookies.get('password'),
			})
		},
	},
	head() {
		return {
			bodyAttrs: {
				class: this.noBackground ? 'no-background' : '', // how to get classes already setted in default.vue like my has-navbar-fixed-top class
			},
		}
	},
}
</script>

<style lang="scss" scoped>
.choose-plan {
	max-width: 520px;
	margin: auto;
	margin-top: 7%;

	&__piggy {
		color: $color-purple-primary;
		width: 110px;
		height: 110px;
	}

	&__info-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	&__label {
		text-align: center;
		color: $color-purple-primary;
		margin-bottom: 12px;
		margin-top: 0;
		font-size: 58px;
	}

	&__info {
		text-align: center;
		max-width: 400px;
		color: #929499;
		margin: auto;
		font-size: 12px;
	}

	&__parameters-section {
		display: flex;
		flex-direction: column;
	}

	&__parameters-wrapper {
		margin-top: 25px;
		display: flex;
		justify-content: center;
		padding-right: 0;
	}

	&__parameter-wrapper {
		display: flex;
		flex-direction: column;
		text-align: left;
		margin-right: 15px;
		width: 100%;
	}

	&__parameter-label {
		margin-bottom: 5px;
		color: $color-grey--900;
	}

	&__parameter-input {
		border: 1px solid $color-grey--600;
		border-radius: 8px;
		padding: 7px;
		outline: none;

		&:active,
		&:focus {
			border-width: 2px;
		}
	}

	&__submit-button {
		align-self: center;
		padding: 10px 40px;
		border-radius: 23px;
		box-shadow: 0 0 12px 0 $color-grey--600;
		color: $color-light;
		background: $color-plan-blue;
		margin-top: 20px;
		outline: none;

		&:hover {
			background-color: $color-grey--450;
		}

		&:focus {
			background-color: $color-grey--500;
		}
	}
}
</style>
