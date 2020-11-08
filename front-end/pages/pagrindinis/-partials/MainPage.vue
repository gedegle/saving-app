<template>
	<div class="dashboard">
		<div class="dasboard__content-wrapper">
			<div class="dashboard__info">
				<div class="dashboard__progress">
					<h1 class="dashboard__title">Progresas</h1>
					<v-progress-circular
						:rotate="-90"
						:size="350"
						:width="10"
						:value="savingsValue"
					>
						<div class="dashboard__savings">
							<div class="dashboard__savings-content">
								<div class="dashboard__savings-wrapper">
									<my-svg class="dashboard__savings-icon" name="saving-pig" />
									<p class="dashboard__savings-text">Sutaupyta</p>
								</div>
								<p class="dashboard__savings-amount">
									<span> € </span>{{ savedAmount }}
								</p>
							</div>
							<p class="dashboard__left-to-save">
								Liko sutaypyti:
								<span> € </span>{{ leftToSave }}
							</p>
						</div>
						<my-svg
							class="dashboard__new-entry-button"
							name="plus-filled"
							@click="isModalNewOpen = !isModalNewOpen"
						/>
					</v-progress-circular>
				</div>
				<div class="top-list">
					<div
						v-for="(item, index) in topExpenses"
						:key="`expenses-${index}`"
						class="top-list__item-wrapper"
					>
						<p class="top-list__type">{{ item.type }}</p>
						<p class="top-list__sum"><span>€</span>{{ item.sum }}</p>
					</div>
				</div>
			</div>
			<div class="dashboard__info">
				<div class="recommends">
					<p class="recommends__title">Rekomenduojama atsisakyti</p>
					<ul class="recommends__list">
						<li v-for="(item, index) in recommends" :key="`rec-${index}`">
							{{ item }}
						</li>
					</ul>
				</div>
				<div class="calendar">
					<div class="calendar__title-wrapper">
						<p v-if="dayTitle" class="calendar__title">
							{{ dayTitle }}
						</p>
						<div>
							<v-btn fab text small color="grey darken-2" @click="prev">
								<v-icon small> mdi-chevron-left </v-icon>
							</v-btn>
							<v-btn fab text small color="grey darken-2" @click="next">
								<v-icon small> mdi-chevron-right </v-icon>
							</v-btn>
						</div>
					</div>
					<v-calendar
						ref="calendar"
						v-model="focus"
						color="primary"
						type="week"
						class="calendar__content"
						@change="dayTitle = $refs.calendar.title"
					></v-calendar>
				</div>
			</div>
		</div>
		<ModalAddNew v-if="isModalNewOpen" @clicked="onClickAddNew($event)" />
	</div>
</template>

<script>
import ModalAddNew from '@/components/ModalAddNew.vue'
import { mapGetters } from 'vuex'

export default {
	components: {
		ModalAddNew,
	},
	data() {
		return {
			isModalNewOpen: false,
			savedAmount: 40,
			totalSavingAmount: 100,
			focus: '',
			dayTitle: new Date().toLocaleString('lt', { month: 'long' }) + ' ' + 2020,
		}
	},
	computed: {
		...mapGetters({
			posts: 'user/posts',
			activePlan: 'user/activePlan',
			plans: 'user/plans',
			activePlanIndex: 'user/activePlanIndex',
		}),
		savingsValue() {
			return (this.savedAmount * 100) / this.totalSavingAmount
		},
		leftToSave() {
			return this.totalSavingAmount - this.savedAmount
		},
		topExpenses() {
			return this.getMaxThree(this.sumedPosts)
		},
		sumedPosts() {
			if (!this.posts.length) {
				return []
			}
			const arr = this.posts

			const reducedArr = arr.reduce((arr, item) => {
				const index = arr.findIndex((i) => {
					return i.type === item.type && i.category === item.category
				})
				if (index > -1) arr[index].sum += item.sum
				else {
					arr.push({ ...item, sum: Math.round(item.sum) })
				}
				return arr
			}, [])

			return reducedArr
		},
		recommends() {
			return this.getMaxThreeReccomends(this.sumedPosts)
		},
	},
	mounted() {
		this.dayTitle = this.$refs.calendar.title
		this.$refs.calendar.checkChange()
	},
	methods: {
		getMaxThree(arr) {
			if (!arr.length) {
				return []
			}

			const reducedArr = Object.values(
				arr.reduce((r, o) => {
					r[o.type] = r[o.type] && r[o.type].sum > o.sum ? r[o.type] : o
					return r
				}, {})
			)

			return reducedArr
				.sort((a, b) => (a.sum < b.sum ? 1 : b.sum < a.sum ? -1 : 0))
				.slice(0, 3)
		},
		getMaxThreeReccomends(arr) {
			if (!arr.length) {
				return []
			}

			const tempArr = []
			let length = 0
			arr.sort((a, b) => (a.sum < b.sum ? 1 : b.sum < a.sum ? -1 : 0))
			arr.some((element) => {
				if (element.type === 'Pramogos' && element.sum >= 30) {
					tempArr.push(element.type)
					length += 1
				} else if (
					(element.type === 'Greitas maistas' ||
						element.type === 'Saldumynai' ||
						element.type === 'Gaivieji gėrimai') &&
					element.sum >= 20
				) {
					tempArr.push(element.type)
					length += 1
				} else if (element.type === 'Baldai' && element.sum >= 150) {
					tempArr.push(element.type)
					length += 1
				} else if (element.type === 'Dekoro prekės' && element.sum >= 80) {
					tempArr.push(element.type)
					length += 1
				} else if (element.type === 'Apyvokos prekės' && element.sum >= 30) {
					tempArr.push(element.type)
					length += 1
				} else if (element.type === 'Viršutiniai rūbai' && element.sum >= 45) {
					tempArr.push(element.type)
					length += 1
				} else if (element.type === 'Avalynė' && element.sum >= 30) {
					tempArr.push(element.type)
					length += 1
				} else if (element.type === 'Aksesuarai' && element.sum >= 15) {
					tempArr.push(element.type)
					length += 1
				} else if (element.type === 'Nuosavas trans.' && element.sum >= 15) {
					tempArr.push(element.type)
					length += 1
				} else if (
					(element.type === 'Žaidimų įranga' ||
						element.type === 'Video ir audio' ||
						element.type === 'Telefoninė įranga' ||
						element.type === 'Kompiuterinė įranga') &&
					element.sum >= 100
				) {
					tempArr.push(element.type)
					length += 1
				}

				return length === 5
			})

			return tempArr
		},
		prev() {
			this.$refs.calendar.prev()
		},
		next() {
			this.$refs.calendar.next()
		},
		onClickAddNew(value) {
			this.isModalNewOpen = value
		},
	},
}
</script>

<style lang="scss" scoped>
.dashboard {
	&__info {
		display: flex;

		&:nth-child(2) {
			margin-top: 15px;
			font-size: 16px;
			color: $color-grey--950;
			justify-content: space-between;
		}
	}

	&__title {
		color: $color-light;
		margin-bottom: 15px;
	}

	&__savings {
		align-items: center;
		margin-top: 42px;
		display: flex;
		height: 186px;
		flex-direction: column;
		justify-content: space-between;
	}

	&__savings-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__savings-wrapper {
		display: flex;
		align-items: center;
	}

	&__savings-icon {
		width: 32px;
		height: 32px;
		margin-right: 15px;
	}

	&__savings-text {
		text-transform: uppercase;
		font-weight: 500;
		align-self: flex-end;
		font-size: 20px;
	}

	&__savings-amount {
		color: $color-purple-primary;
		font-size: 68px;
		font-weight: 900;

		span {
			font-size: 38px;
		}
	}

	&__left-to-save {
		color: $color-grey--700;

		span {
			margin-right: -4px;
			font-size: 14px;
		}
	}

	&__new-entry-button {
		transition: transform 0.2s ease-in-out;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		color: $color-purple-primary;
		position: absolute;
		right: -36px;
		box-shadow: 0 0 10px 0 $color-grey--600;
		cursor: pointer;

		&:hover {
			transform: scale(1.1);
		}
	}
}

.calendar {
	&__title-wrapper {
		border-bottom: 1px solid $color-grey--800;
		margin-bottom: 10px;
		padding-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__title {
		text-transform: capitalize;
	}

	&__content {
		&:not(.s) {
			width: 500px;
			height: auto;
			background-color: transparent;
			border: none;
		}

		& ::v-deep {
			.v-calendar-daily__body {
				&:not(.s) {
					display: none;
				}
			}

			.v-calendar-daily__intervals-head {
				&:not(.s) {
					display: none;
				}
			}

			.v-calendar-daily_head-day {
				&:not(.s) {
					border: none;
				}
			}

			button {
				&:not(.s) {
					height: 100px;
					border-radius: 40px;
				}
			}

			.primary {
				color: $color-grey--500;
			}
		}
	}
}

.v-progress-circular {
	$this: &;

	color: $color-green--200;
	background-color: $color-light;
	border-radius: 50%;
	border: 10px solid $color-light;

	::v-deep {
		& #{$this}__underlay {
			stroke: $color-light;
		}
	}
}

.modal-open {
	overflow: hidden;
}

.recommends {
	&__title {
		border-bottom: 1px solid $color-grey--800;
		margin: 13px 0 10px 0;
		padding-bottom: 10px;
		padding-right: 90px;
	}

	&__list {
		list-style-type: none;
	}
}

.top-list {
	position: relative;
	width: 100%;
	margin-left: 160px;
	color: $color-grey--500;
	display: flex;
	flex-direction: column;
	margin-top: 40px;

	&__item-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: $color-light;
		width: 335px;
		margin-left: auto;
		padding: 18px;
		border-radius: 10px;
		margin-bottom: 25px;
		align-items: flex-end;

		&::before {
			color: $color-light;
			top: -25%;
			content: '1';
			width: 44%;
			height: 150%;
			position: absolute;
			background-color: $color-purple-primary;
			left: -21%;
			z-index: 3;
			border-radius: 10px;
			box-shadow: 0 0 20px 0 $color-grey--700;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 105px;
			font-weight: 800;
		}

		&:nth-child(2) {
			width: 300px;
			padding: 16px 18px;
			margin-bottom: 20px;

			&::before {
				color: $color-grey--500;
				font-size: 72px;
				content: '2';
				z-index: 2;
				top: -13%;
				width: 42%;
				height: 126%;
				background-color: $color-light;
			}
		}

		&:nth-child(3) {
			width: 270px;
			padding: 14px 18px;
			margin-bottom: 20px;

			&::before {
				color: $color-grey--500;
				content: '3';
				font-size: 68px;
				z-index: 1;
				top: -12%;
				width: 40%;
				height: 120%;
				background-color: $color-light;
			}
		}
	}

	&__type {
		font-size: 16px;
		font-weight: 600;
	}

	&__sum {
		font-size: 26px;
		font-weight: 700;

		span {
			font-size: 16px;
		}
	}
}
</style>
