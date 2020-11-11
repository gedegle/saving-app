<template>
	<div class="chart-wrapper">
		<LineChart
			v-if="!$fetchState.pending"
			:chart-data="chartData"
			:options="options"
			:styles="{
				width: '1000px',
				'background-color': '#fff',
				padding: '30px 170px 0 170px',
				'border-radius': '10px',
			}"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import LineChart from './-partials/LineChart.js'
import PlansApi from '~/utils/PlansApi'
export default {
	components: {
		LineChart,
	},
	async fetch() {
		await PlansApi.getPlanStats(this.activePlan).then((data) => {
			this.chartData.labels = Object.keys(data.data)
			this.chartData.datasets = [
				{
					label: 'Išlaidos, €',
					backgroundColor: 'rgba(255, 0, 195, 0.26)',
					pointBackgroundColor: 'white',
					data: Object.values(data.data),
				},
			]
		})
	},
	data() {
		return {
			chartData: {
				labels: [],
				datasets: [],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
			},
			noBackground: false,
		}
	},
	computed: {
		...mapGetters({
			activePlan: 'user/activePlan',
		}),
	},
	watch: {
		$route() {
			if (this.$auth.user) {
				this.noBackground = false
			}
		},
	},
	head() {
		return {
			bodyAttrs: {
				class: this.noBackground ? 'no-background' : '', // how to get classes already setted in default.vue like my has-navbar-fixed-top class
			},
		}
	},
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 600px;
	overflow: hidden;
	position: relative;
}

::v-deep .chartjs-size-monitor {
	position: relative;
}
</style>
