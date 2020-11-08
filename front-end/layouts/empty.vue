<template>
	<Nuxt />
</template>

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
	overflow-y: hidden;
}
</style>
