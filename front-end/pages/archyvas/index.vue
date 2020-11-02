<template>
	<div class="archive">
		<table class="archive__content-table">
			<thead>
				<tr class="archive__table-head">
					<th class="archive__table-head-cell">Suma, €</th>
					<th class="archive__table-head-cell">Mėnesio pajamos, €</th>
					<th class="archive__table-head-cell">Sutaupyta</th>
					<th class="archive__table-head-cell">Veiksmai</th>
				</tr>
			</thead>
			<tbody class="archive__table-body">
				<tr
					v-for="(item, index) in plans"
					:key="`plan-${index}`"
					class="archive__table-body-row"
				>
					<td class="archive__table-body-cell">{{ item.sum }}</td>
					<td class="archive__table-body-cell">{{ item.income }}</td>
					<td class="archive__table-body-cell">
						<my-svg
							v-if="item.if_saved === 1"
							class="archive__table-body-cell-icon archive__table-body-cell-icon--check"
							name="check"
						/>
						<my-svg
							v-else
							class="archive__table-body-cell-icon archive__table-body-cell-icon--minus"
							name="minus"
						/>
					</td>
					<td class="archive__table-body-cell archive__table-body-cell--actions">
						<my-svg
							class="archive__plan-icon"
							name="edit"
							@click="openEditModal(item)"
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
		<!-- <ModalAddNew
			v-if="isModalOpen"
			:to-edit="toEdit"
			:button-text="buttonText"
			:prop-date="date"
			:prop-type="type"
			:prop-sum="sum"
			:plan-id="planId"
			@clicked="onClickEdit($event)"
		/> -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlansApi from '@/utils/PlansApi.js'

export default {
	data() {
		return {
			plans: [],
			nextPage: 1,
			prevPage: 1,
			isModalOpen: false,
			planId: null,
			income: '',
			sum: 0,
		}
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
	computed: {
		...mapGetters({
			activePlan: 'user/activePlan',
			userId: 'user/userId',
		}),
	},
	methods: {
		async fetchData() {
			await PlansApi.getArchivedUserPlans(
				this.userId,
				parseInt(this.$route.query.page) || 1
			).then((res) => {
				this.plans = res.data
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
		openModal(plan) {
			this.income = plan.income
			this.sum = plan.sum
			this.planId = plan.id
			this.isModalOpen = true
		},
		goToNextPage() {
			this.$router.push({
				path: '/archyvas',
				query: {
					page: this.nextPage,
				},
			})
		},
		goToPrevPage() {
			this.$router.push({
				path: '/archyvas',
				query: {
					page: this.prevPage,
				},
			})
		},
	},
	async fetch() {
		await this.fetchData()
	},
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/_mixins.scss';

.archive {
	background-color: white;
	border-radius: 10px;
	height: 700px;
	display: flex;
	flex-direction: column;

	&__content-table {
		border-collapse: separate;
		border-spacing: 0 7px;
		box-sizing: border-box;
		flex-grow: 1;
		margin: 0;
		max-width: 1200px;
		padding: 30px 30px 0 30px;
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

	&__plan-icon {
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
		}
	}

	&__table-body-cell-icon {
		width: 20px;
		height: 20px;
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
