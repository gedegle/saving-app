<template>
	<div class="sidebar-wrapper">
		<div class="sidebar">
			<div>
				<h1 class="sidebar__title">Saving app</h1>
				<div class="sidebar__plans-wrapper">
					<div
						v-for="(item, index) in plans"
						:key="`plan-${index}`"
						class="sidebar__plan"
						:class="{
							'sidebar__plan--active': index === activePlanIndex,
						}"
						@click="openPlan(index)"
					>
						<div class="sidebar__sum-wrapper">
							<my-svg
								class="sidebar__plan-icon"
								:class="{
									'sidebar__plan-icon--active': index === activePlanIndex,
								}"
								name="saving-pig"
							/>
							<p>
								<span> € </span>
								{{ item.sum }}
							</p>
						</div>
						<my-svg
							v-if="index === activePlanIndex"
							class="sidebar__arrow"
							:class="{
								'sidebar__arrow--active': index === activePlanIndex,
							}"
							name="arrow-right"
						/>
					</div>
					<div class="buttons">
						<div class="buttons__button">
							<my-svg
								class="buttons__icon"
								:class="{
									'buttons__icon--active': activeSettingIndex === 0,
								}"
								name="plus"
							/>
							<p class="buttons__text">Naujas planas</p>
						</div>
						<div class="buttons__button">
							<my-svg
								class="buttons__icon"
								:class="{
									'buttons__icon--active': activeSettingIndex === 1,
								}"
								name="notebook"
							/>
							<p class="buttons__text">Užrašai</p>
						</div>
						<div class="buttons__button">
							<my-svg
								class="buttons__icon"
								:class="{
									'buttons__icon--active': activeSettingIndex === 2,
								}"
								name="archive"
							/>
							<p class="buttons__text">Archyvas</p>
						</div>
						<div class="buttons__button">
							<my-svg
								class="buttons__icon"
								:class="{
									'buttons__icon--active': activeSettingIndex === 3,
								}"
								name="settings"
							/>
							<p class="buttons__text">Nustatymai</p>
						</div>
					</div>
				</div>
			</div>
			<div class="signout">
				<my-svg class="signout__icon" name="sign-out" />
				<p class="signout__text">Atsijungti</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			plans: 'user/plans',
			activePlanIndex: 'user/activePlanIndex',
		}),
		activeSettingIndex() {
			return 0
		},
	},
	methods: {
		async openPlan(index) {
			this.$store.commit('user/setActivePlan', this.plans[index])
			await this.$store.dispatch('user/refetchUserData')
		},
	},
}
</script>

<style scoped lang="scss">
.sidebar-wrapper {
	overflow: auto;
	max-width: 293px;
	height: 100vh;
	top: 0;
	left: 0;
	position: fixed;
}

.sidebar {
	$this: &;

	height: 100%;
	width: 100%;
	z-index: 1;
	max-width: 274px;
	background-color: $color-sidebar-grey;
	padding: 20px 15px 0 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&__title {
		text-transform: uppercase;
		font-size: 18px;
		color: $color-grey--900;
		font-weight: 500;
		border-bottom: 1px solid $color-grey--700;
		padding-bottom: 10px;
		margin-bottom: 15px;
	}

	&__plan {
		background-color: $color-plan-pink;
		max-width: 244px;
		margin: 8px 0;
		height: 73px;
		border-radius: 8px;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		cursor: pointer;

		&--active {
			background-color: $color-plan-blue;
		}

		&:hover {
			background-color: $color-plan-blue;

			& #{$this}__plan-icon {
				color: $color-purple-primary;
			}
		}
	}

	&__sum-wrapper {
		font-weight: 500;
		font-size: 26px;
		color: $color-plan-grey;
		width: 100%;
		display: flex;
		align-items: baseline;

		span {
			&:not(.s) {
				font-size: 18px;
			}
		}
	}

	&__plan-icon {
		color: $color-pink-primary;
		width: 32px;
		margin-right: 10px;
		height: 30px;

		&--active {
			color: $color-purple-primary;
		}
	}

	&__arrow {
		width: 14px;
		height: 14px;
		align-self: center;

		&--active {
			color: $color-grey--500;
		}
	}
}

.buttons {
	$this: &;

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	&__button {
		flex: 0 0 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 116px;
		width: 100%;
		margin-top: 10px;
		height: 115px;
		justify-content: center;
		padding: 10px;
		border-radius: 16px;
		box-shadow: 0 6px 8px 0 $color-grey--700;
		color: $color-grey--800;
		cursor: pointer;
		font-weight: 500;

		&:hover {
			color: $color-grey--900;

			& #{$this}__icon {
				color: $color-grey--900;
			}
		}
	}

	&__icon {
		height: 30px;
		width: 30px;
		margin-bottom: 10px;
		color: $color-grey--600;
	}

	&__text {
		text-align: center;
	}
}

.signout {
	display: flex;
	margin: 10px 0;

	&__icon {
		color: $color-grey--700;
		width: 20px;
		height: 20px;
		margin-right: 8px;
	}

	&__text {
		color: $color-grey--900;
	}
}
</style>
