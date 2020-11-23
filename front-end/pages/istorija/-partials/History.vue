<template>
	<div class="history">
		<div class="history__buttons-wrapper">
			<input
				v-model="date"
				type="date"
				class="history__date-picker"
				@change="selectDate($event.target.value)"
			/>
			<my-svg
				name="plus-filled"
				class="history__add-button"
				@click="openNewModal"
			/>
		</div>
		<table class="history__content-table">
			<thead>
				<tr class="history__table-head">
					<th class="history__table-head-cell">Tipas</th>
					<th class="history__table-head-cell">Suma</th>
					<th class="history__table-head-cell">Data</th>
					<th class="history__table-head-cell">Veiksmai</th>
				</tr>
			</thead>
			<tbody class="history__table-body">
				<tr
					v-for="(item, index) in posts"
					:key="`post-${index}`"
					class="history__table-body-row"
				>
					<td class="history__table-body-cell">{{ item.type }}</td>
					<td class="history__table-body-cell">{{ item.sum }}</td>
					<td class="history__table-body-cell">{{ item.date }}</td>
					<td class="history__table-body-cell history__table-body-cell--actions">
						<my-svg
							class="history__post-icon"
							name="edit"
							@click="openEditModal(item)"
						/>
						<my-svg
							class="history__post-icon"
							name="delete"
							@click="deletePost(item.id)"
						/>
					</td>
				</tr>
			</tbody>
		</table>
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
		<ModalAddNew
			v-if="isModalNewOpen"
			:to-edit="toEdit"
			:button-text="buttonText"
			:prop-date="date"
			:prop-type="type"
			:prop-sum="sum"
			:post-id="postId"
			@clicked="onClickEdit($event)"
		/>
	</div>
</template>

<script>
import ModalAddNew from '@/components/ModalAddNew.vue'
import PlansApi from '@/utils/PlansApi.js'
import { mapGetters } from 'vuex'
import calculateSavings from '@/mixins/calculateSavings.js'

export default {
	components: {
		ModalAddNew,
	},
	mixins: [calculateSavings],
	async fetch() {
		await this.fetchData()
	},
	data() {
		return {
			posts: [],
			nextPage: 1,
			prevPage: 1,
			isModalNewOpen: false,
			postId: null,
			type: '',
			sum: 0,
			toEdit: true,
			buttonText: '',
			date: this.$route.query.date || null,
		}
	},
	computed: {
		...mapGetters({
			activePlan: 'user/activePlan',
			activePlanIndex: 'user/activePlanIndex',
			selectedDate: 'user/selectedDate',
			activePosts: 'user/posts',
			plans: 'user/plans',
		}),
	},
	watch: {
		$route(from, to) {
			if (from.query.page !== to.query.page) {
				this.fetchData()
			}

			if (from.query.date) {
				this.selectDate(this.date)
			}
		},
	},
	mounted() {
		if (this.$route.query.date && this.$route.query.date.length) {
			this.selectDate(this.date)
		}
	},
	methods: {
		selectDate(date) {
			this.$store.commit('user/selectPlanPostsDate', date)
			this.$router.push({
				path: '/istorija',
				query: {
					page: 1,
					date,
				},
			})
		},
		async fetchData() {
			await PlansApi.filterPostsByDate(
				this.activePlan || this.$route.query.plan,
				parseInt(this.$route.query.page) || 1,
				this.selectedDate
			).then((res) => {
				this.posts = res.data
				const totalPages = Math.ceil(res.meta.total / 7)

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
		onClickEdit(value) {
			this.isModalNewOpen = value
			setTimeout(() => this.fetchData(), 500)
		},
		openEditModal(post) {
			this.toEdit = true
			this.buttonText = 'Pakeisti'
			this.date = post.date
			this.type = post.type
			this.sum = post.sum
			this.postId = post.id
			this.isModalNewOpen = true
		},
		openNewModal() {
			this.toEdit = false
			this.buttonText = 'Pridėti'
			this.date = null
			this.type = null
			this.sum = null
			this.postId = null
			this.isModalNewOpen = true
		},
		deletePost(id) {
			PlansApi.deletePost(id)
			setTimeout(() => {
				this.fetchData()
				setTimeout(
					() => this.calculateSavings(this.plans[this.activePlanIndex]),
					700
				)
			}, 700)
		},
		goToNextPage() {
			this.$router.push({
				path: '/istorija',
				query: {
					page: this.nextPage,
					date: this.selectedDate,
				},
			})
		},
		goToPrevPage() {
			this.$router.push({
				path: '/istorija',
				query: {
					page: this.prevPage,
					date: this.selectedDate,
				},
			})
		},
	},
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/_mixins.scss';

.history {
	background-color: white;
	border-radius: 10px;
	height: 620px;
	display: flex;
	flex-direction: column;

	&__content-table {
		border-collapse: separate;
		border-spacing: 0 7px;
		box-sizing: border-box;
		flex-grow: 1;
		margin: 0;
		max-width: 1200px;
		padding: 30px 30px 5px 30px;
		position: relative;
		table-layout: fixed;
		width: 100%;
		height: auto;
	}

	&__table-body-row {
		border-radius: 5px;
		height: 60px;

		@include shadow($color-cell-shadow);
		@include transition(all, 0.3s);

		&:hover {
			transform: scale(1.01);

			@include shadow(#bababa, 5px);
		}
	}

	&__table-head {
		font-size: 12px;
		position: sticky;
		text-align: left;
		color: $color-grey--900;
	}

	&__table-head-cell {
		padding-left: 10px;
	}

	&__table-body-cell {
		padding: 10px;

		&--actions {
			display: flex;
			height: 100%;
			align-items: center;
		}
	}

	&__post-icon {
		width: 25px;
		height: 25px;
		cursor: pointer;
		color: $color-grey--900;

		&:hover,
		&:focus {
			color: $color-purple-primary;
		}

		&:first-child {
			margin-right: 10px;
			padding-right: 10px;
			border-right: 1px solid $color-grey--800;
		}

		&:last-child {
			padding: 0 10px 0 0;
		}
	}

	&__buttons-wrapper {
		display: flex;
		padding-right: 25px;
		justify-content: flex-end;
		padding-top: 20px;
	}

	&__add-button {
		cursor: pointer;
		width: 25px;
		height: 25px;
		margin-left: 15px;
		border-radius: 50%;
		color: #7045ff;
		box-shadow: 0 0 10px 0 #b4b2b2;
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
