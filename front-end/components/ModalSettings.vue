<template>
	<div>
		<div class="modal-overlay" @click="onClickButton()" />
		<div class="modal">
			<form class="modal__form" @submit.prevent="addNew()">
				<label class="modal__label" for="name">Vardas</label>
				<input
					id="name"
					v-model="name"
					class="modal__input"
					type="text"
					name="name"
				/>
				<label class="modal__label" for="email">El. Paštas</label>
				<input
					id="email"
					v-model="email"
					class="modal__input"
					type="email"
					name="email"
				/>
				<v-btn class="modal__button" type="submit" depressed> Patvirtinti </v-btn>
			</form>
			<form class="modal__form" @submit.prevent="changePassword()">
				<label class="modal__label" for="password">Naujas slaptažodis</label>
				<input
					id="password"
					v-model="password"
					class="modal__input"
					type="password"
					name="password"
				/>
				<v-btn class="modal__button" type="submit" depressed>
					Keisti slaptažodį
				</v-btn>
			</form>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlansApi from '~/utils/PlansApi'

export default {
	props: {
		dialog: {
			type: Boolean,
			default: false,
		},
		propName: {
			type: String,
			default: '',
		},
		propEmail: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			name: this.propName,
			email: this.propEmail,
			password: '',
		}
	},
	computed: {
		...mapGetters({
			userId: 'user/userId',
		}),
	},
	methods: {
		onClickButton() {
			this.$emit('clicked', false)
		},
		addNew() {
			PlansApi.updateProfile({
				id: this.userId,
				name: this.name,
				email: this.email,
			})
			setTimeout(() => this.$store.dispatch('user/refetchUserData'), 1000)
			this.onClickButton()
		},
		changePassword() {
			PlansApi.updatePassword({
				id: this.userId,
				password: this.password,
			})
			setTimeout(() => this.$store.dispatch('user/refetchUserData'), 1000)
			this.onClickButton()
		},
	},
}
</script>
<style lang="scss" scoped>
.modal-overlay {
	position: absolute;
	opacity: 0.46;
	background-color: $color-dark;
	width: 100%;
	border-color: $color-dark;
	height: 100%;
	z-index: 5;
	bottom: 0;
	left: 0;
	cursor: pointer;
}

.modal {
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	z-index: 5;
	background-color: $color-light;
	position: absolute;
	height: 360px;
	top: 50%;
	left: 50%;
	padding: 20px;
	transform: translate(-50%, -50%);
	border-radius: 10px;

	&__select,
	&__input {
		box-shadow: 0 0 2px $color-grey--700;
		width: 250px;
		padding: 9px 15px;
		border-radius: 8px;
		margin-bottom: 10px;

		&:focus,
		&:active {
			border-radius: 8px;
			border: 1px solid $color-grey--900;
			outline: none;
		}
	}

	&__label {
		margin-bottom: 10px;
	}

	&__form {
		display: flex;
		flex-direction: column;
	}

	&__button {
		font-family: 'Roboto', sans-serif;
		width: 100%;
	}
}
</style>
