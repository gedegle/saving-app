import { Pie, mixins } from 'vue-chartjs'

export default {
	extends: Pie,
	mixins: [mixins.reactiveProp],
	mounted() {
		this.renderChart(this.chartData, this.options)
	},
	watch: {
		chartData(to, from) {
			this.renderChart(this.chartData, this.options)
		},
	},
}
