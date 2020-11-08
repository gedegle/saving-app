<template>
	<div>
		<div class="modal-overlay" @click="onClickButton()" />
		<div class="modal">
			<label for="types">Pasirinkite kategoriją</label>
			<select id="types" v-model="type" class="modal__select" name="types">
				<optgroup
					v-for="(item, key, index) in typesWithSubs"
					:key="`typegroup-${key || index}`"
					:label="key"
				>
					<option
						v-for="(subItem, subKey, subIndex) in item"
						:key="`type-${subIndex || subKey}`"
						:value="subItem"
					>
						{{ subItem }}
					</option>
				</optgroup>
				<option
					v-for="(item, key, index) in onlyTypes"
					:key="`subtype-${index || key}`"
					:value="item"
				>
					{{ item }}
				</option>
			</select>
			<form class="modal__form" @submit.prevent="addNew()">
				<label class="modal__label" for="sum">Įveskite sumą</label>
				<input
					id="sum"
					v-model="sum"
					class="modal__input"
					type="number"
					name="sum"
				/>
				<label class="modal__label" for="date">Pasirinkite datą</label>
				<input
					id="date"
					v-model="date"
					class="modal__input"
					type="date"
					name="date"
				/>
				<v-btn class="modal__button" type="submit" depressed>
					{{ buttonText }}
				</v-btn>
			</form>
		</div>
	</div>
</template>

<script>
import { postTypes } from '@/utils/constants.js'
import { mapGetters } from 'vuex'
import PlansApi from '~/utils/PlansApi'

export default {
	props: {
		dialog: {
			type: Boolean,
			default: false,
		},
		buttonText: {
			type: String,
			default: 'Pridėti',
		},
		postId: {
			type: [String, Number],
			default: null,
		},
		propDate: {
			type: String,
			default: '',
		},
		propSum: {
			type: [String, Number],
			default: '',
		},
		propType: {
			type: String,
			default: '',
		},
		toEdit: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			postTypes,
			date: this.propDate,
			sum: this.propSum,
			type: this.propType,
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
			if (this.toEdit) {
				PlansApi.updatePost(this.postId, {
					date: this.date,
					sum: this.sum,
					type: this.type,
				})
			} else {
				PlansApi.addNewPost(
					this.$auth.user.id,
					this.date,
					this.sum,
					this.activePlan,
					this.type
				)
			}
			setTimeout(() => this.$store.dispatch('user/refetchUserData'), 500)
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
	height: 324px;
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
	}
}
</style>
