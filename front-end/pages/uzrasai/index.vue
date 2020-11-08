<template>
	<div class="notes">
		<div class="notes__wrapper">
			<table class="notes__content-table">
				<tbody class="notes__table-body">
					<tr
						v-for="(item, index) in notes"
						:key="`note-${index}`"
						class="notes__table-body-row"
					>
						<div class="notes__note-wrapper" @click="openNote(item)">
							<p class="notes__note-title">{{ item.title }}</p>
							<p class="notes__note-content">{{ item.note.slice(0, 100) }}...</p>
						</div>
						<my-svg
							name="delete"
							class="notes__delete-button"
							@click="deleteNote(item)"
						/>
					</tr>
				</tbody>
			</table>
			<my-svg name="plus-filled" class="notes__add-button" @click="openNewModal" />
		</div>
		<div class="pagination">
			<button
				class="pagination__button"
				:disabled="!prevPage"
				@click="goToPrevPage"
			>
				Ankstesnis
			</button>
			<button
				class="pagination__button"
				:disabled="!nextPage"
				@click="goToNextPage"
			>
				Kitas
			</button>
		</div>
		<ModalNote
			v-if="isNoteOpen"
			:note="openedNote"
			@clicked="onClickClose($event)"
		/>
		<ModalNewNote v-if="isModalNewOpen" @clicked="onClickClose($event)" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlansApi from '@/utils/PlansApi.js'
import ModalNote from '@/components/ModalNote.vue'
import ModalNewNote from '@/components/ModalNewNote.vue'

export default {
	components: {
		ModalNote,
		ModalNewNote,
	},
	async fetch() {
		await this.fetchData()
	},
	data() {
		return {
			notes: [],
			nextPage: 1,
			prevPage: 1,
			isNoteOpen: false,
			openedNote: {},
			isModalNewOpen: false,
		}
	},
	computed: {
		...mapGetters({
			activePlan: 'user/activePlan',
		}),
	},
	watch: {
		$route(from, to) {
			if (from.query.page !== to.query.page) {
				this.fetchData()
			}

			if (from.query.date) {
				this.fetchData()
			}
		},
	},
	methods: {
		async fetchData() {
			await PlansApi.getUserNotes(this.$auth.user.id).then((res) => {
				this.notes = res.data
				const totalPages = Math.ceil(res.total / 7)

				if (totalPages > 1) {
					if (
						this.$route.query.page &&
						parseInt(this.$route.query.page) <= this.nextPage &&
						parseInt(this.$route.query.page) + 1 <= totalPages
					) {
						this.nextPage = parseInt(this.$route.query.page) + 1
					} else if (!this.$route.query.page) {
						this.nextPage = 2
					} else {
						this.nextPage = null
					}

					if (
						this.$route.query.page &&
						parseInt(this.$route.query.page) !== 1 &&
						parseInt(this.$route.query.page) > this.prevPage
					) {
						this.prevPage = parseInt(this.$route.query.page) - 1
					} else {
						this.prevPage = null
					}
				}
			})
		},
		deleteNote(note) {
			PlansApi.deleteNote(note.id)
			setTimeout(() => this.fetchData(), 500)
		},
		onClickClose(value) {
			this.isNoteOpen = value
			this.isModalNewOpen = value
			setTimeout(() => this.fetchData(), 500)
		},
		openNote(note) {
			this.isNoteOpen = true
			this.openedNote = note
		},
		openNewModal(note) {
			this.isModalNewOpen = true
		},
		goToNextPage() {
			this.$router.push({
				path: '/uzrasai',
				query: {
					page: this.nextPage,
				},
			})
		},
		goToPrevPage() {
			this.$router.push({
				path: '/uzrasai',
				query: {
					page: this.prevPage,
				},
			})
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_mixins.scss';

.notes {
	background-color: white;
	border-radius: 10px;
	height: 700px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 30px 30px 0 30px;

	&__wrapper {
		&:not(.s) {
			display: flex;
		}
	}

	&__content-table {
		border-collapse: separate;
		border-spacing: 0 7px;
		box-sizing: border-box;
		flex-grow: 1;
		margin: 0;
		max-width: 1200px;
		position: relative;
		table-layout: fixed;
		width: 100%;
		height: auto;
		margin-right: 60px;
	}

	&__table-body-row {
		border-radius: 5px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		@include shadow($color-cell-shadow);
		@include transition(all, 0.3s);

		&:hover {
			transform: scale(1.01);

			@include shadow(#bababa, 5px);
		}
	}

	&__note-wrapper {
		&:not(.s) {
			padding: 0 20px;
			cursor: pointer;
			border-left: 10px solid $color-purple-primary;
			margin: 10px 0 10px 15px;
		}
	}

	&__note-title {
		font-weight: 700;
		font-size: 18px;
	}

	&__note-content {
		font-size: 14px;
	}

	&__add-button {
		cursor: pointer;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		color: #7045ff;
		box-shadow: 0 0 10px 0 #b4b2b2;
		margin-left: auto;
		margin-bottom: 15px;
		position: fixed;
		left: calc(100% - 226px);
	}

	&__delete-button {
		width: 20px;
		height: 15px;
		cursor: pointer;
		margin-right: 25px;

		&:hover,
		&:focus {
			color: red;
		}
	}
}

.pagination {
	display: flex;
	justify-content: center;
	padding-bottom: 20px;

	&__button {
		padding: 10px;
		outline: none;

		&:hover,
		&:focus {
			color: $color-purple-primary;
		}
	}
}
</style>
