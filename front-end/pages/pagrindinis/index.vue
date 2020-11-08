<template>
	<loader v-if="!$auth.user.planCount" :loading="!$auth.user" />
	<Dashboard v-else />
</template>

<script>
import Dashboard from './-partials/MainPage.vue'

export default {
	components: {
		Dashboard,
	},
}
</script>
