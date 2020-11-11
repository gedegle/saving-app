<template>
	<div class="loader"></div>
</template>

<style lang="scss">
.loader {
	border: 3px solid $color-light;
	border-radius: 50%;
	border-top: 3px solid $color-grey--800;
	width: 20px;
	height: 20px;
	-webkit-animation: spin 2s linear infinite; /* Safari */
	animation: spin 2s linear infinite;
	margin-top: 15px;
}

/* Safari */
@-webkit-keyframes spin {
	0% {
		-webkit-transform: rotate(0deg);
	}

	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
