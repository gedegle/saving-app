<template>
	<div class="snippet" data-title=".dot-pulse">
		<div class="stage">
			<div class="dot-pulse"></div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
	},
	head() {
		return {
			bodyAttrs: {
				class: this.loading ? 'no-background' : '', // how to get classes already setted in default.vue like my has-navbar-fixed-top class
			},
		}
	},
}
</script>

<style lang="scss">
.snippet {
	margin-left: auto;
	display: flex;
	flex-direction: column;
	width: calc(100% - 360px);
	margin-right: 25px;
	padding: 10px 130px;
	justify-content: center;
	height: 100vh;
}

.dot-pulse {
	position: relative;
	left: -9999px;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: #9880ff;
	color: #9880ff;
	box-shadow: 9999px 0 0 -5px #9880ff;
	animation: dotPulse 1.5s infinite linear;
	animation-delay: 0.25s;
}

.dot-pulse::before,
.dot-pulse::after {
	content: '';
	display: inline-block;
	position: absolute;
	top: 0;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: #9880ff;
	color: #9880ff;
}

.dot-pulse::before {
	box-shadow: 9984px 0 0 -5px #9880ff;
	animation: dotPulseBefore 1.5s infinite linear;
	animation-delay: 0s;
}

.dot-pulse::after {
	box-shadow: 10014px 0 0 -5px #9880ff;
	animation: dotPulseAfter 1.5s infinite linear;
	animation-delay: 0.5s;
}

@keyframes dotPulseBefore {
	0% {
		box-shadow: 9984px 0 0 -5px #9880ff;
	}

	30% {
		box-shadow: 9984px 0 0 2px #9880ff;
	}

	60%,
	100% {
		box-shadow: 9984px 0 0 -5px #9880ff;
	}
}

@keyframes dotPulse {
	0% {
		box-shadow: 9999px 0 0 -5px #9880ff;
	}

	30% {
		box-shadow: 9999px 0 0 2px #9880ff;
	}

	60%,
	100% {
		box-shadow: 9999px 0 0 -5px #9880ff;
	}
}

@keyframes dotPulseAfter {
	0% {
		box-shadow: 10014px 0 0 -5px #9880ff;
	}

	30% {
		box-shadow: 10014px 0 0 2px #9880ff;
	}

	60%,
	100% {
		box-shadow: 10014px 0 0 -5px #9880ff;
	}
}
</style>
