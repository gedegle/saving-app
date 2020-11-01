/* eslint-disable indent */
module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-prettier',
		'stylelint-config-standard',
		'stylelint-config-recommended-scss',
	],
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['v-deep'],
			},
		],
		'at-rule-no-unknown': [null],
		indentation: 'tab',
		'function-calc-no-invalid': null,
	},
}
