<template>
	<div>
		<Sidebar :remove-plan-highligh="!showNavigation" />
		<div class="main-layout">
			<Navigation v-if="showNavigation" />
			<Nuxt />
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		showNavigation() {
			if (
				this.$route.path === '/naujas-planas' ||
				this.$route.path === '/archyvas' ||
				this.$route.path === '/uzrasai' ||
				!this.$auth.user.planCount
			) {
				return false
			}
			return true
		},
	},
	watch: {
		async $route() {
			if (this.$auth.user.planCount === 0) {
				this.$router.push('naujas-planas')
			} else if (!this.$store.state.user.activePlanIndex) {
				await this.$store.dispatch('user/setUser')
			}
		},
	},
	async mounted() {
		if (this.$auth.user.planCount === 0) {
			this.$router.push('naujas-planas')
		} else if (!this.$store.state.user.activePlanIndex) {
			await this.$store.dispatch('user/setUser')
		}
	},
	middleware: ['redirectToNewPlan'],
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@200;300;400;500;700;800;900&display=swap');
@import '@/assets/scss/_mixins.scss';

html {
	font-family: 'Heebo', sans-serif;
	font-size: 16px;
	word-spacing: 1px;
	-ms-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	box-sizing: border-box;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
}

body {
	background: #e8eaee url('../assets/images/gradent-mosaic.png');
	overflow-y: hidden;
	background-repeat: no-repeat;
	background-position-x: center;
	background-size: cover;
	background-position-y: -500px;

	@include up-to-medium {
		background-position-y: -300px;
	}

	&.no-background {
		background: #e8eaee;
	}
}

.main-layout {
	margin-left: auto;
	display: flex;
	flex-direction: column;
	width: calc(100% - 360px);
	margin-right: 25px;
	padding: 10px 130px;
}
</style>
