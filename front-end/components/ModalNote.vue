<template>
	<div>
		<div class="modal-overlay" @click="onClickButton()" />
		<div class="modal">
			<textarea v-model="title" class="modal__title modal__input" />
			<textarea v-model="noteContent" class="modal__content modal__input" />
			<v-btn class="modal__button" @click="submitNote">Keisti</v-btn>
		</div>
	</div>
</template>

<script>
import PlansApi from '~/utils/PlansApi'

export default {
	props: {
		note: {
			type: Object,
			default: () => {},
		},
	},
	data() {
		return {
			noteContent: this.note.note,
			title: this.note.title,
		}
	},
	methods: {
		onClickButton() {
			this.$emit('clicked', false)
		},
		submitNote() {
			PlansApi.updateNote({
				id: this.note.id,
				note: this.noteContent,
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
	height: auto;
	width: 500px;
	top: 50%;
	left: 50%;
	padding: 20px;
	transform: translate(-50%, -50%);
	border-radius: 10px;

	&__input {
		box-shadow: 0 0 2px $color-grey--700;
		width: 100%;
		resize: none;
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

	&__title {
		font-weight: 700;
		font-size: 18px;
		height: 47px;
	}

	&__content {
		font-weight: 300;
		min-height: 300px;
	}

	&__button {
		margin-left: auto;
	}
}
</style>
