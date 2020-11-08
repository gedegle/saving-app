<template>
	<div>
		<div class="modal-overlay" @click="onClickButton()" />
		<div class="modal">
			<form class="modal__form" @submit.prevent="addNew()">
				<label class="modal__label" for="sum">Pavadinimas</label>
				<input
					id="title"
					v-model="title"
					class="modal__input"
					type="text"
					name="title"
				/>
				<label class="modal__label" for="date">Įrašas</label>
				<textarea
					id="note"
					v-model="note"
					class="modal__input modal__input--textarea"
					type="text"
					name="note"
				/>
				<v-btn class="modal__button" type="submit" depressed> Pridėti </v-btn>
			</form>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlansApi from '~/utils/PlansApi'

export default {
	data() {
		return {
			title: '',
			note: '',
		}
	},
	computed: {
		...mapGetters({
			posts: 'user/posts',
			activePlan: 'user/activePlan',
		}),
		typesWithSubs() {
			const keys = Object.keys(this.postTypes).filter(
				(key) => this.postTypes[key].length
			)
			const withSubs = {}
			keys.forEach((item) => {
				withSubs[item] = this.postTypes[item]
			})
			return withSubs
		},
		onlyTypes() {
			return Object.keys(this.postTypes).filter(
				(item) => !this.postTypes[item].length
			)
		},
	},
	methods: {
		onClickButton() {
			this.$emit('clicked', false)
		},
		addNew() {
			PlansApi.addNote({
				user_id: this.$auth.user.id,
				note: this.note,
				title: this.title,
			})
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
	top: 50%;
	left: 50%;
	padding: 20px;
	transform: translate(-50%, -50%);
	border-radius: 10px;

	&__input {
		box-shadow: 0 0 2px $color-grey--700;
		width: 450px;
		padding: 9px 15px;
		border-radius: 8px;
		margin-bottom: 10px;

		&:focus,
		&:active {
			border-radius: 8px;
			border: 1px solid $color-grey--900;
			outline: none;
		}

		&--textarea {
			height: 300px;
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
	}
}
</style>
