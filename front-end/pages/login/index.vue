<template>
	<div class="signin">
		<div class="signin__wrapper">
			<p v-if="!toRegister" class="signin__title">Prisijungti</p>
			<p v-else class="signin__title">Registruotis</p>
			<form @submit.prevent="!toRegister ? signIn() : signUp()">
				<transition name="mode-fade" mode="in-out">
					<div v-if="toRegister" class="signin__form">
						<input
							id="name"
							v-model="name"
							class="signin__input"
							placeholder="Vardas"
							name="name"
							type="text"
							required
						/>
						<input
							id="email"
							v-model="email"
							class="signin__input"
							placeholder="El. paštas"
							name="email"
							type="email"
							required
						/>
						<input
							id="password"
							v-model="password"
							class="signin__input"
							placeholder="Slaptažodis"
							name="password"
							type="password"
							required
						/>
						<input
							id="password2"
							v-model="password2"
							class="signin__input"
							placeholder="Pakartokite slaptažodį"
							name="password2"
							type="password"
							required
						/>
						<div @click="toRegister = false">Atgal į prisijungimą</div>
						<div class="signin__button-wrapper">
							<button class="signin__button" type="submit">
								{{ toRegister ? 'Registruotis' : 'Prisijungti' }}
							</button>
						</div>
					</div>
					<div
						v-else
						class="signin__form"
						@submit.prevent="!toRegister ? signIn() : signUp()"
					>
						<input
							id="email"
							v-model="email"
							class="signin__input"
							placeholder="El. paštas"
							name="email"
							type="email"
							required
						/>
						<input
							id="password"
							v-model="password"
							class="signin__input"
							placeholder="Slaptažodis"
							name="password"
							type="password"
							required
						/>
						<div v-if="!toRegister">
							Neturi paskyros?
							<span @click="toRegister = true">Registruokis</span>
						</div>
						<div class="signin__button-wrapper">
							<spinner-loader v-if="loading" />
							<button v-else class="signin__button" type="submit">
								{{ toRegister ? 'Registruotis' : 'Prisijungti' }}
							</button>
						</div>
					</div>
				</transition>
			</form>
		</div>
		<transition name="mode-fade" mode="in-out">
			<div v-show="showError" class="toast">
				{{ errorText }}
			</div>
		</transition>
	</div>
</template>

<script>
/* eslint-disable no-tabs */
import PlansApi from '@/utils/PlansApi'

export default {
	layout: 'empty',
	data() {
		return {
			name: '',
			email: '',
			password: '',
			password2: '',
			toRegister: false,
			showError: false,
			errorText: '',
			loading: false,
		}
	},
	computed: {
		actionLink() {
			return this.toRegister ? '/naujas-planas' : '/pagrindinis'
		},
	},
	methods: {
		async signIn() {
			this.showError = false
			this.loading = true
			try {
				await this.$store
					.dispatch('user/signInUser', {
						email: this.email,
						password: this.password,
					})
					.then(() => {
						this.loading = false
						if (this.$auth.planCount === 0) {
							this.$router.push({
								path: '/naujas-planas',
							})
						} else {
							this.$router.push(this.actionLink)
						}
					})
			} catch {
				this.errorText = 'Prisijungimas nepavyko'
				this.showError = true
				this.loading = false
				setTimeout(() => {
					this.showError = false
				}, 6000)
			}
		},
		async signUp() {
			if (this.password !== this.password2) {
				this.showError = true
				this.errorText = 'Slaptažodžiai turi sutapti'
				setTimeout(() => {
					this.showError = false
				}, 6000)
				return
			}
			try {
				const { data } = await PlansApi.register({
					name: this.name,
					email: this.email,
					password: this.password,
				})
				this.loading = true

				setTimeout(() => {
					this.$store
						.dispatch('user/signInUser', {
							email: data.email,
							password: this.password,
						})
						.then(() => {
							this.loading = false
							if (this.$auth.planCount === 0) {
								this.$router.push({
									path: '/naujas-planas',
								})
							} else {
								this.$router.push(this.actionLink)
							}
						})
				}, 1000)
			} catch {
				this.showError = true
				this.errorText = 'Registracija nepavyko, bandykite dar kartą'
				setTimeout(() => {
					this.showError = false
				}, 6000)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.signin {
	background-image: url('../../assets/images/gradent-mosaic.png');
	background-position: bottom;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	width: 100%;
	display: flex;

	&__form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__wrapper {
		align-items: center;
		color: $color-light;
		flex-direction: column;
		width: 500px;
		background-color: rgba($color-dark, 0.3);
		display: flex;
		justify-content: center;
		align-self: center;
		margin: 0 auto;
		backdrop-filter: blur(5px);
		padding: 20px;
		min-height: 300px;
		border-radius: 10px;
	}

	&__input {
		height: 48px;
		padding: 12px;
		width: 324px;
		border: 1px solid $color-grey--800;
		border-radius: 5px;
		margin-bottom: 15px;
		background-color: $color-light;
		color: $color-grey--900;
		font-size: 16px;

		&::placeholder {
			color: $color-grey--600;
		}
	}

	&__title {
		margin-bottom: 20px;
		font-size: 22px;
	}

	&__button-wrapper {
		display: flex;
		justify-content: center;
	}

	&__button {
		margin-top: 15px;
		border: 1px solid white;
		border-radius: 10px;
		padding: 10px 25px;
	}
}

.toast {
	position: fixed;
	bottom: 30px;
	background-color: $color-dark;
	color: $color-light;
	padding: 10px 30px;
	left: 50%;
	font-size: 12px;
	transform: translateX(-50%);
}

.mode-fade-enter-active,
.mode-fade-leave-active {
	transition: opacity 0.5s ease;
}

.mode-fade-enter-from,
.mode-fade-leave-to {
	opacity: 0;
}
</style>
