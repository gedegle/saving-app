<template>
	<component
		:is="path ? 'i18n' : tag"
		:tag="path ? tag : undefined"
		:path="path"
		:class="[textClass, weight]"
	>
		<slot />
	</component>
</template>
<script>
import ZyroTextSlot from './ZyroTextSlot.vue'

const weights = ['strong', 'regular', 'light', 'standard', null]

const elements = {
	h1: {
		tag: 'h1',
		class: 'h1',
	},
	h2: {
		tag: 'h2',
		class: 'h2',
	},
	h3: {
		tag: 'h3',
		class: 'h3',
	},
	h4: {
		tag: 'h4',
		class: 'h4',
	},
	h5: {
		tag: 'h5',
		class: 'h5',
	},
	p: {
		tag: 'p',
		class: 'body',
	},
	label: {
		tag: 'label',
		class: 'body-small',
	},
	span: {
		tag: 'span',
		class: 'body',
	},
}

const types = [
	'h1',
	'h2',
	'h3',
	'h4',
	'subtitle',
	'title',
	'h5',
	'body',
	'body-small',
]

export default {
	components: {
		ZyroTextSlot,
	},
	props: {
		path: {
			type: String,
			default: undefined,
		},
		places: {
			type: String,
			default: '',
		},
		tag: {
			type: String,
			validator(value) {
				return !!elements[value]
			},
			default: 'p',
		},
		type: {
			type: String,
			validator(value) {
				return types.includes(value)
			},
			default: null,
		},
		weight: {
			type: String,
			validator(value) {
				return weights.includes(value)
			},
			default: null,
		},
		desktopType: {
			type: String,
			validator(value) {
				return types.includes(value)
			},
			default: null,
		},
		preserveQuery: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		textClass() {
			const mainClass = this.type || elements[this.tag].class
			const desktopClass = `${this.desktopType || mainClass}--desktop`
			const modifierClass = this.tag === 'span' ? 'no-margin' : ''
			return `${mainClass} ${desktopClass} ${modifierClass}`
		},
	},
}
</script>

<style lang="scss" scoped>
@mixin style(
	$margin,
	$size,
	$height,
	$weight: 300,
	$spacing: null,
	$transform: null,
	$style: null,
	$family: $font-family--primary
) {
	margin-bottom: $margin;
	font-family: $family;
	font-size: $size;
	font-weight: $weight;
	line-height: $height;
	overflow-wrap: break-word;

	@if ($spacing) {
		letter-spacing: $spacing;
	}

	@if ($transform) {
		text-transform: $transform;
	}

	@if ($style) {
		font-style: $style;
	}
}

@mixin desktop() {
	@include medium {
		&--desktop {
			@content;
		}
	}
}

.h1 {
	@include style($margin: 24px, $size: 42px, $height: 1.33);

	@include desktop {
		@include style($margin: 48px, $size: 100px, $height: 1.07);
	}
}

.h2 {
	@include style($margin: 24px, $size: 36px, $height: 1.55);

	@include desktop {
		@include style($margin: 48px, $size: 77px, $height: 1.3);
	}
}

.h3 {
	@include style($margin: 24px, $size: 34px, $height: 1.35);

	@include desktop {
		@include style($margin: 48px, $size: 58px, $height: 1.31);
	}
}

.h4 {
	@include style($margin: 8px, $size: 26px, $height: 1.38);

	@include desktop {
		@include style($margin: 8px, $size: 36px, $height: 1.39);
	}
}

.h5 {
	@include style($margin: 0, $size: 22px, $height: 1.45, $weight: 500);

	@include desktop {
		@include style($margin: 0, $size: 26px, $height: 1.31, $weight: 500);
	}
}

.title {
	@include style(
		$margin: 8px,
		$size: 14px,
		$height: 1.57,
		$weight: bold,
		$spacing: 0.167em,
		$transform: uppercase
	);

	@include desktop {
		@include style(
			$margin: 8px,
			$size: 14px,
			$height: 1.57,
			$weight: bold,
			$spacing: 0.167em,
			$transform: uppercase
		);
	}
}

.subtitle {
	@include style(
		$margin: 8px,
		$size: 12px,
		$height: 1.83,
		$weight: 400,
		$spacing: 0.167em,
		$transform: uppercase
	);

	@include desktop {
		@include style(
			$margin: 8px,
			$size: 12px,
			$height: 1.83,
			$weight: 400,
			$spacing: 0.167em,
			$transform: uppercase
		);
	}
}

.body {
	@include style($margin: 16px, $size: 16px, $height: 1.5, $spacing: 0.031em);

	@include desktop {
		@include style($margin: 16px, $size: 16px, $height: 1.5, $spacing: 0.031em);
	}
}

.body-small {
	@include style($margin: 16px, $size: 14px, $height: 1.43);

	@include desktop {
		@include style($margin: 16px, $size: 14px, $height: 1.43);
	}
}

// Additional weight setting
.strong {
	font-weight: 700;
}

.regular {
	font-weight: 500;
}

.light {
	font-weight: 300;
}

.standard {
	font-weight: 400;
}

.no-margin {
	margin: 0;
}

// Uses v-deep in order style all in one place:
// - link inside current component default <slot />
// - link insize ZyroTextSlot
a {
	&,
	::v-deep & {
		display: inline-block; // removes empty space after
		color: $color-dark;
		text-decoration: underline;
	}
}

span {
	&,
	::v-deep & {
		display: inline-block; // removes empty space after
	}
}

.slot-color {
	&--white {
		color: $color-light;
	}

	&--black {
		color: $color-dark;
	}

	&--plump-purple {
		color: $color-primary;
		text-decoration: unset;
	}
}
</style>
