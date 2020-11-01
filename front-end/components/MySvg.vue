<template>
	<svg-icon
		:name="name"
		:class="`icon-${className}`"
		:alt="alt"
		v-on="$listeners"
	/>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			default: '',
		},
	},
	computed: {
		className() {
			return this.name.includes('/')
				? this.name.split('/').slice(-1).pop()
				: this.name
		},
	},
}
</script>
