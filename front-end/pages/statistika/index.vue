<template>
	<div></div>
</template>

<script>
import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    data() {
        return {
            chartdata: [],
            options: [],
        };
    },
	mounted() {
		this.renderChart(this.chartdata, this.options)
	},
}
</script>

<style lang="scss" scoped></style>
