<template>
	<div>
		<Sidebar />
		<div class="main-layout">
			<Navigation />
			<Nuxt />
		</div>
	</div>
</template>
<script>
export default {
	middleware: 'dispatchData',
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
	background-position-y: 250%;

	@include up-to-medium {
		background-position-y: 15%;
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
